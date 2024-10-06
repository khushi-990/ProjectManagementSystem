import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { GenderEnum } from "../enum/User.enum";

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    @ApiProperty({example: 'Male | Female'})
    @IsNotEmpty()
    @IsEnum(GenderEnum, { message: 'Gender must be either Male or Female' })
    gender: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    profilePic: string;
  }
  
