import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { TaskPriority, TaskStatusEnum } from "../enum/Task.enum";
export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({example: 'NOT_STARTED | IN_PROGRESS | ON_HOLD | COMPLETED | CANCELLED'})
  @IsNotEmpty()
  @IsEnum(TaskStatusEnum, { message: 'Task must be either NOT_STARTED,IN_PROGRESS,ON_HOLD,COMPLETED,CANCELLED' })
  status: string;

  @ApiProperty({example: 'LOW | MEDIUM | HIGH | CRITICAL'})
  @IsNotEmpty()
  @IsEnum(TaskPriority, { message: 'Task must be either LOW,MEDIUM,HIGH,CRITICAL' })
  priority: string;

  @ApiProperty()
  @IsNotEmpty()
  projectId: string;
}


export class UpdateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({example: 'NOT_STARTED | IN_PROGRESS | ON_HOLD | COMPLETED | CANCELLED'})
  @IsNotEmpty()
  @IsEnum(TaskStatusEnum, { message: 'Task must be either NOT_STARTED,IN_PROGRESS,ON_HOLD,COMPLETED,CANCELLED' })
  status: string;

  @ApiProperty({example: 'LOW | MEDIUM | HIGH | CRITICAL'})
  @IsNotEmpty()
  @IsEnum(TaskPriority, { message: 'Task must be either LOW,MEDIUM,HIGH,CRITICAL' })
  priority: string;

}
