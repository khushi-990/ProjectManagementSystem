import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Tasks, TasksSchema } from './schemas/task.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonService } from 'src/common/services/common.service';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    ProjectModule,
    MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema }]),
  ],
  providers: [TaskService,CommonService],
  controllers: [TaskController]
})
export class TaskModule {}
