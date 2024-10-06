import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { LoginDto, PaginationDto } from "../common/dto/common.dto";
import { AuthExceptions, TypeExceptions } from "../common/helpers/exceptions";
import { LoggerService } from "../common/logger/logger.service";
import { Users, UsersDocument } from "../users/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RESPONSE_ERROR } from "../common/constants/response.constant";
import { EncryptPasswordService } from "src/services/encrypt.service";
import { GenderEnum, UserTypeEnum } from "./enum/User.enum";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    private myLogger: LoggerService,
    private configService: ConfigService,
    private encryptPasswordService: EncryptPasswordService
  ) {
    // Due to transient scope, UsersService has its own unique instance of MyLogger,
    // so setting context here will not affect other instances in other services
    this.myLogger.setContext(UsersService.name);
  }

  async create(createUserDto: CreateUserDto) {
    // Check duplicate user
    if (await this.getUserByEmail(createUserDto.email)) {
      throw TypeExceptions.AlreadyExistsCommonFunction(
        RESPONSE_ERROR.USER_ALREADY_EXIST,
      );
    }
    const password = await this.encryptPasswordService.encryptPassword(createUserDto.password)
    const gender = GenderEnum[createUserDto.gender]
    console.log("🚀 ~ UsersService ~ create ~ gender:", gender)
    return await this.userModel.create({ ...createUserDto, password, gender });
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(userId: string) {
    return await this.userModel.findOne({
      _id: userId,
    })
  }

  async findUserBasedOnProject(projectId: string) {
    return await this.userModel.find({
      projectIds: { $in: projectId }
    }).select('_id')
  }



  async findOneSelectedField(userId: string) {
    return await this.userModel.findById(userId).select('completedProblems -_id').exec();
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    updateUserDto.gender = GenderEnum[updateUserDto.gender]

    return await this.userModel.findOneAndUpdate(
      { _id: userId },
      updateUserDto,
    );
  }

  async remove(userId: string) {
    return await this.userModel.deleteOne({ _id: userId });
  }

  async createInitialUser(): Promise<void> {
    const user = await this.getUserByEmail(
      this.configService.get("database.initialUser.email"),
    );

    if (user) {
      this.myLogger.customLog("Initial user already loaded.");
    } else {
      const params: CreateUserDto = {
        firstName: this.configService.get("database.initialUser.firstName"),
        lastName: this.configService.get("database.initialUser.lastName"),
        gender: this.configService.get("database.initialUser.gender"),
        email: this.configService.get("database.initialUser.email"),
        password: "",
      };

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(
        this.configService.get("database.initialUser.password"),
        salt,
      );

      params.password = hash;

      await this.userModel.create(params);
      this.myLogger.log("Initial user loaded successfully.");
    }
  }

  async login(params: LoginDto) {
    const user = await this.userModel.findOne({
      email: params.email,
    });

    if (!user) {
      throw AuthExceptions.AccountNotExist();
    }

    if (!user.isActive) {
      throw AuthExceptions.AccountNotActive();
    }

    if (!await this.encryptPasswordService.comparePassword(params.password, user.password)) {
      throw AuthExceptions.InvalidPassword();
    }

    delete user.password;
    delete user.__v;

    return user;
  }

  async getUserByEmail(email: string) {
    // console.log("🚀 ~ UsersService ~ getUserByEmail ~ email:", email)
    return await this.userModel.findOne({
      email: email,
    });
  }


  async updateUsersWithProjectId(userIds: string[], projectId: string, removeIds?: string[],) {
    const userIdsArray = userIds.map(id => id.toString());
    await this.userModel.updateMany(
      { _id: { $in: userIdsArray } },  
      {
        $addToSet: {
          projectIds: projectId 
        }
      }
    );
    if (removeIds.length) {
      await this.userModel.updateMany(
        { _id: { $in: removeIds } },  
        {
          $pull: {
            projectIds: projectId  
          }
        }
      );
    }
  }

  /**
 * Lists All user with pagination, optional search functionality.
 * 
 * @param body - The pagination and search criteria.
 * @returns An array containing the total count of Users and the paginated list of users.
 */
  async findAllUser(body: PaginationDto) {
    const limit = body.limit ? Number(body.limit) : 10; // Default limit to 10 if not specified.
    const page = body.page ? Number(body.page) : 1; // Default page to 1 if not specified.
    const skip = (page - 1) * limit; // Calculate the number of documents to skip.

    const aggregateQuery = [];

    aggregateQuery.push({
      $match: {
        userType: UserTypeEnum.User
      }
    })

    // Project the desired fields from the topics and subject details.
    aggregateQuery.push({
      $project: {
        firstName: "$firstName",
        lastName: "$lastName", // Get the subject name from the joined data.
        gender: "$gender",
        email: "$email", // Get the subject name from the joined data.
        isActive: "$isActive", // Get the subject name from the joined data.
        createdAt: "$createdAt",
        updatedAt: "$updatedAt",
      },
    });

    // If a search term is provided, create a regex to match topic and subject names.
    if (body.search) {
      const searchText = body.search;
      const regex = new RegExp(searchText, "i"); // Create a case-insensitive regex.
      aggregateQuery.push({
        $match: {
          $or: [
            {
              firstName: {
                $regex: regex, // Match topic names that contain the search term.
              },
            },
            {
              lastName: {
                $regex: regex, // Match subject names that contain the search term.
              },
            },
            {
              email: {
                $regex: regex, // Match subject names that contain the search term.
              },
            },
          ],
        },
      });
    }

    // Determine the sort direction based on the provided parameters.
    const sortDir = body.sort_order && body.sort_order.includes('asc') ? 1 : -1;

    // Sort the results by the specified field or by 'createdAt' by default.
    aggregateQuery.push({
      $sort: { [body.sort_by ? `${body.sort_by}` : 'createdAt']: sortDir },
    });

    // Use $facet to get both the total count of topics and the paginated topic list.
    aggregateQuery.push({
      $facet: {
        total_records: [{ $count: "count" }],
        userList: [{ $skip: skip }, { $limit: limit }],
      },
    });

    // Execute the aggregation query.
    const UserList = await this.userModel
      .aggregate(aggregateQuery)
      .exec();

    // Ensure the total records count is included in the response.
    if (UserList) {
      UserList[0].total_records =
        UserList[0].total_records.length > 0
          ? UserList[0].total_records[0].count
          : 0;
    }
    return UserList[0]; // Return the results.
  }
}
