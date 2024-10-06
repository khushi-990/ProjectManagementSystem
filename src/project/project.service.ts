import { Injectable } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dto/create-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Projects, ProjectsDocument } from './schemas/project.schema';
import mongoose, { Model } from 'mongoose';
import { CommonService } from 'src/common/services/common.service';
import { RESPONSE_ERROR } from 'src/common/constants/response.constant';
import { PaginationDto } from 'src/common/dto/common.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Projects.name) private projectModel: Model<ProjectsDocument>,
        private readonly commonService: CommonService,
        private readonly usersService: UsersService,
    ) { }

    /**
     * This function is used for create project
     * @param createProblemDto 
     * @returns 
     */

    async create(createProjectDto: CreateProjectDto) {
        const project = await this.projectModel.create(createProjectDto);
        await this.usersService.updateUsersWithProjectId(createProjectDto.userIds, project.id)
    }

    /**
    * Finds a project by its ID.
    * 
    * @param _id - The ID of the project to be found.
    * @returns The project document if found, otherwise throws an error.
    */
    async findOne(_id: string) {
        // Retrieve the topic details using the common service method.
        const project = await this.commonService.getDetails(this.projectModel, _id, RESPONSE_ERROR.PROJECT_NOT_FOUND);
        const userIds = (await this.usersService.findUserBasedOnProject(project._id.toString())).map(id => id._id)
        return { ...project.toJSON(), userIds }
    }

    /**
    * Finds a project by its ID.
    * 
    * @param _id - The ID of the project to be found.
    * @returns The project document if found, otherwise throws an error.
    */
    async updateOneTaskId(_id: string, createdTask) {
        // Retrieve the topic details using the common service method.
        return await this.projectModel.findOneAndUpdate({ _id }, { $addToSet: { taskIds: createdTask._id.toString() } });
    }

    /**
     * Lists Projects with pagination, optional  search functionality.
     * @param body - The pagination and search criteria.
     * @returns An array containing the total count of Project and the paginated list of Project.
     */
    async listProjects(body: PaginationDto, loginUser?) {
        const limit = body.limit ? Number(body.limit) : 10; // Default limit to 10 if not specified.
        const page = body.page ? Number(body.page) : 1; // Default page to 1 if not specified.
        const skip = (page - 1) * limit; // Calculate the number of documents to skip.

        const aggregateQuery = [];

        // If userId is provided, get the projectIds from the user table
        let userProjectIds = [];
        if (loginUser?._id) {
            const user = await this.usersService.findOne(loginUser._id)
            userProjectIds = user.projectIds.map(id => new mongoose.Types.ObjectId(id));
        }

        // If userProjectIds are available, filter projects based on projectIds
        if (userProjectIds.length > 0) {
            aggregateQuery.push({
                $match: {
                    _id: { $in: userProjectIds },
                },
            });
        }


        // Project the desired fields from the topics and subject details.
        aggregateQuery.push({
            $project: {
                title: "$title",
                description: "$description",
                isActive: "$isActive",
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
                            title: {
                                $regex: regex, // Match topic names that contain the search term.
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
                projectList: [{ $skip: skip }, { $limit: limit }],
            },
        });

        // Execute the aggregation query.
        const ProjectList = await this.projectModel
            .aggregate(aggregateQuery)
            .exec();

        // Ensure the total records count is included in the response.
        if (ProjectList) {
            ProjectList[0].total_records =
                ProjectList[0].total_records.length > 0
                    ? ProjectList[0].total_records[0].count
                    : 0;
        }
        return ProjectList[0]; // Return the results.
    }

    /**
    * This function is used for update Project NOTE: Don't update value which have refernce craete like TaskIds
    * @param ProjectId 
    * @param updateProjectDto 
    * @returns 
    */

    async UpdateProject(projectId: string, body: UpdateProjectDto) {
        await this.projectModel.findOneAndUpdate(
            { _id: projectId },
            body,
        );

        await this.usersService.updateUsersWithProjectId(body.userIds, projectId, body.removeIds)
        return {}
    }

    /**
    * This function is used for delete projectId
    * @param projectId 
    * @returns 
    */
    async remove(projectId: string) {
        return await this.projectModel.deleteOne({ _id: projectId });
    }
}
