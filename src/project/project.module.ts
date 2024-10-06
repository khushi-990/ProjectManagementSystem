import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Projects, ProjectsSchema } from './schemas/project.schema';
import { CommonService } from 'src/common/services/common.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Projects.name, schema: ProjectsSchema }]),
  ],
  providers: [ProjectService,CommonService],
  controllers: [ProjectController],
  exports: [ProjectService]
})
export class ProjectModule {}
