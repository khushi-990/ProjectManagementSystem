import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
export class CreateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: [String] })  // Specify the array type in Swagger documentation
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()  // Ensures that the array is not empty
  @IsString({ each: true })  // Ensures that each element in the array is a string
  userIds: string[];
}

export class UpdateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: [String] })  
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()  
  @IsString({ each: true })  
  userIds: string[];

  @ApiProperty({ type: [String] })  
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()  
  @IsString({ each: true })  
  removeIds: string[];
}