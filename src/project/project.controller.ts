import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserTypeEnum } from 'src/users/enum/User.enum';
import { ProjectService } from './project.service';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { RESPONSE_SUCCESS } from 'src/common/constants/response.constant';
import { CreateProjectDto, UpdateProjectDto } from './dto/create-project.dto';
import {  PaginationDto } from 'src/common/dto/common.dto';
import { Users } from 'src/users/schemas/user.schema';

@Controller('project')
@ApiTags("Admin | Project Management")
@ApiBearerAuth()


export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post("create")
    @ResponseMessage(RESPONSE_SUCCESS.PROJECT_INSERTED)
    @ApiOperation({
        description: `This API will be used for creating new Project using the admin panel.`,
    })
    @Roles(UserTypeEnum.Admin)
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.create(createProjectDto);
    }

    @Post("/list")
    @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
    @ResponseMessage(RESPONSE_SUCCESS.PROJECT_LISTED)
    @ApiOperation({ summary: 'Admin can review all Project' })
    findAll(@Body() body: PaginationDto, @Req() req: Request) {
        const user = req['user'] as Users;
        console.log(user)
        if(user.userType == 1){
        return this.projectService.listProjects(body, user);
        }
        return this.projectService.listProjects(body);
    }

    @Get("getDetails/:id")
    @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
    @ApiOperation({ summary: 'Admin can get details of Project' })
    @ResponseMessage(RESPONSE_SUCCESS.PROJECT_DETAILS)
    findOne(@Param("id") id: string) {
        return this.projectService.findOne(id);
    }

    @Patch("update/:id")
    @Roles(UserTypeEnum.Admin)
    @ResponseMessage(RESPONSE_SUCCESS.PROJECT_UPDATED)
    @ApiOperation({ summary: 'Admin can update details of Project' })
    update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectService.UpdateProject(id, updateProjectDto);
    }

    @Delete("delete/:id")
    @Roles(UserTypeEnum.Admin)
    @ApiOperation({ summary: 'Admin can get delete of Project' })
    @ResponseMessage(RESPONSE_SUCCESS.PROJECT_DELETED)
    remove(@Param("id") id: string) {
        return this.projectService.remove(id);
    }

}
