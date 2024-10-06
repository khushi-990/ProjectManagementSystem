import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { PaginationDto } from "src/common/dto/common.dto";
import { RESPONSE_SUCCESS } from "../common/constants/response.constant";
import { ResponseMessage } from "../common/decorators/response.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserTypeEnum } from "./enum/User.enum";
import { UsersService } from "./users.service";

@Controller("admin/users")
@Roles(UserTypeEnum.Admin)
@ApiTags("Admin|User Management")
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get("getAll")
  @ResponseMessage(RESPONSE_SUCCESS.USER_LISTED)
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @Get("getDetails/:id")
  @ResponseMessage(RESPONSE_SUCCESS.USER_LISTED)
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch("update/:id")
  @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
  @ResponseMessage(RESPONSE_SUCCESS.USER_UPDATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete("delete/:id")
  @ResponseMessage(RESPONSE_SUCCESS.USER_DELETED)
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }

  @Post("/list")
  @ResponseMessage(RESPONSE_SUCCESS.USER_LISTED)
  @ApiOperation({ summary: 'Admin can review all User Based on pagination' })
  findAllUser(@Body() body: PaginationDto) {
    return this.usersService.findAllUser(body);
  }
}
