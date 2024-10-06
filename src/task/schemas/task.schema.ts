import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Date } from "mongoose";
import { TABLE_NAMES } from "../../common/constants/table-name.constant";
import { TaskPriority, TaskStatusEnum } from "../enum/Task.enum";

export type TasksDocument = Tasks & Document;

@Schema({ collection: TABLE_NAMES.TASK, timestamps: true })
export class Tasks {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({required:true,type:Number, enum: TaskStatusEnum, default: 1})
  status: TaskStatusEnum;

  @Prop({required:true,type:Number, enum: TaskPriority, default: 1})
  priority: TaskPriority;

  @Prop({ type: Date })
  createdAt: Date

  @Prop({ type: Date })
  updatedAt: Date
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
