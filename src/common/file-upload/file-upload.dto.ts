import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { UploadFolderEnum } from "src/common/constants/enum.constant";

export class fileSingleUploadDto {
  @ApiProperty({ type: "file", required: true, format: "binary" })
  file: string;

  @ApiProperty({ required: true })
  @IsEnum(UploadFolderEnum)
  @IsString()
  moduleName: string;
}

