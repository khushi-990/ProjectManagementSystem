import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RESPONSE_SUCCESS } from 'src/common/constants/response.constant';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import {  PaginationDto } from 'src/common/dto/common.dto';
import { UserTypeEnum } from 'src/users/enum/User.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('task')
@ApiTags("Admin | Task Management")
@Roles(UserTypeEnum.Admin, UserTypeEnum.User)
@ApiBearerAuth()

export class TaskController {
    constructor(
        private readonly taskService: TaskService,
    ) { }
    @Post("/create")
    @ResponseMessage(RESPONSE_SUCCESS.TASK_INSERTED)
    @ApiOperation({
        description: `This API will be used for creating new task using the admin panel.`,
    })
    create(@Body() CreateTaskDto: CreateTaskDto) {
        return this.taskService.create(CreateTaskDto);
    }

    @Post("/list")
    @ResponseMessage(RESPONSE_SUCCESS.TASK_LISTED)
    @ApiOperation({ summary: 'Admin can review all Tasks' })
    findAll(@Body() body: PaginationDto) {
        return this.taskService.listTaks(body);
    }

    @Get("getDetails/:id")
    @ResponseMessage(RESPONSE_SUCCESS.TASK_DETAILED)
    @ApiOperation({ summary: 'Admin can get details of Task' })
    findOne(@Param("id") id: string) {
        return this.taskService.findOne(id);
    }

    @Patch("update/:id")
    @ResponseMessage(RESPONSE_SUCCESS.TASK_UPDATED)
    @ApiOperation({ summary: 'Admin can update details of Task' })
    update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.UpdateTask(id, updateTaskDto);
    }

    @Delete("delete/:id")
    @ApiOperation({ summary: 'Admin can deleted of Task' })
    @ResponseMessage(RESPONSE_SUCCESS.TASK_DELETED)
    remove(@Param("id") id: string) {
        return this.taskService.remove(id);
    }

}
