import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks, TasksDocument } from './schemas/task.schema';
import { CommonService } from 'src/common/services/common.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { ProjectService } from 'src/project/project.service';
import { TypeExceptions } from 'src/common/helpers/exceptions';
import { RESPONSE_ERROR } from 'src/common/constants/response.constant';
import { PaginationDto } from 'src/common/dto/common.dto';
import { Model } from 'mongoose';
import { TaskPriority, TaskStatusEnum } from './enum/Task.enum';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Tasks.name) private taskModel: Model<TasksDocument>,
        private readonly commonService: CommonService,
        private readonly projectService: ProjectService,
    ) { }

    /**
    * This function is used for create task
    * @param CreateTaskDto 
    * @returns 
    */

    async create(body: CreateTaskDto) {
        body.status = TaskStatusEnum[body.status]
        body.priority = TaskPriority[body.priority]

        const createdTask = await this.taskModel.create(body);
        const project = await this.projectService.findOne(body.projectId)
        if (!project) {
            throw TypeExceptions.NotFoundCommonFunction(
                RESPONSE_ERROR.PROJECT_NOT_FOUND,
            );
        }
        await this.projectService.updateOneTaskId(body.projectId, createdTask)
        return createdTask;

    }

    /**
    * Finds a task by its ID.
    * 
    * @param _id - The ID of the project to be found.
    * @returns The project document if found, otherwise throws an error.
    */
    async findOne(_id: string) {
        // Retrieve the topic details using the common service method.
        return await this.commonService.getDetails(this.taskModel, _id, RESPONSE_ERROR.TASK_NOT_FOUND);
    }

    /**
     * Lists Task with pagination, optional  search functionality.
     * 
     * @param body - The pagination and search criteria.
     * @returns An array containing the total count of Project and the paginated list of Project.
     */
    async listTaks(body: PaginationDto) {
        const limit = body.limit ? Number(body.limit) : 10; // Default limit to 10 if not specified.
        const page = body.page ? Number(body.page) : 1; // Default page to 1 if not specified.
        const skip = (page - 1) * limit; // Calculate the number of documents to skip.

        const aggregateQuery = [];

        // Project the desired fields from the topics and subject details.
        aggregateQuery.push({
            $project: {
                name: "$name",
                description: "$description",
                isActive: "$isActive",
                createdAt: "$createdAt",
                updatedAt: "$updatedAt",
                status: {
                    $switch: {
                        branches: [
                            { case: { $eq: ["$status", 0] }, then: "NOT_STARTED" },
                            { case: { $eq: ["$status", 1] }, then: "IN_PROGRESS" },
                            { case: { $eq: ["$status", 2] }, then: "ON_HOLD" },
                            { case: { $eq: ["$status", 3] }, then: "COMPLETED" },
                            { case: { $eq: ["$status", 4] }, then: "CANCELLED" },
                        ],
                        default: "UNKNOWN"  // Fallback for unknown statuses
                    }
                },
                priority: {
                    $switch: {
                        branches: [
                            { case: { $eq: ["$priority", 0] }, then: "Low" },
                            { case: { $eq: ["$priority", 1] }, then: "Medium" },
                            { case: { $eq: ["$priority", 2] }, then: "High" },
                            { case: { $eq: ["$priority", 3] }, then: "Critical" },
                        ],
                        default: "UNKNOWN"  // Fallback for unknown statuses
                    }
                }
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
                            name: {
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
                taskList: [{ $skip: skip }, { $limit: limit }],
            },
        });

        // Execute the aggregation query.
        const TaskList = await this.taskModel
            .aggregate(aggregateQuery)
            .exec();

        // Ensure the total records count is included in the response.
        if (TaskList) {
            TaskList[0].total_records =
                TaskList[0].total_records.length > 0
                    ? TaskList[0].total_records[0].count
                    : 0;
        }
        return TaskList[0]; // Return the results.
    }

    /**
    * This function is used for update Task
    * @param TaskId 
    * @param UpdateTaskDto 
    * @returns 
    */

    async UpdateTask(taskId: string, body: UpdateTaskDto) {
        
        await this.taskModel.findOneAndUpdate(
            { _id: taskId },
            body,
        );
        return {}
    }
    
    /**
     * This function is used for delete taskId
     * @param taskId 
     * @returns 
     */

    async remove(taskId: string) {
        return await this.taskModel.deleteOne({ _id: taskId });
    }
}
