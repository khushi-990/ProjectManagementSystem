import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  { Document, Date } from "mongoose";
import { TABLE_NAMES } from "../../common/constants/table-name.constant";

export type ProjectsDocument = Projects & Document;

@Schema({ collection: TABLE_NAMES.PROJECT, timestamps: true })
export class Projects {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: [] })
  taskIds: string[];

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
  
}

// Create the schema
export const ProjectsSchema = SchemaFactory.createForClass(Projects);

// Add Indexes
ProjectsSchema.index({ taskIds: 1 }); // Index for chapterId
ProjectsSchema.index({ createdAt: -1 }); // Index for sorting by createdAt
