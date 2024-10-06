import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import {  FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { diskStorage } from "multer";

import {  TypeExceptions } from "src/common/helpers/exceptions";
import {
  fileSingleUploadDto,
} from "./file-upload.dto";
import { FileUploadService } from "./file-upload.service";
import { imageBase } from "src/config/app.config";
import { UploadEnum } from "src/common/constants/enum.constant";
import { ResponseMessage } from "../decorators/response.decorator";
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../constants/response.constant";
import { UserTypeEnum } from "src/users/enum/User.enum";
import { Roles } from "../decorators/roles.decorator";

@ApiTags("Common - File-Upload")
@Controller("common/file-upload")
@Roles(UserTypeEnum.Admin, UserTypeEnum.User)
@ApiBearerAuth()
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  /**
   * This Function is use for upload file or image
   */
  @Post("uploadSingleFile")
  @ApiConsumes("multipart/form-data")
  @ResponseMessage(RESPONSE_SUCCESS.FILE_UPLOAD)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const filename = `${file.originalname}`;
          callback(null, filename);
        },
      }),
    })
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() params: fileSingleUploadDto,
  ) {
      console.log("🚀 ~ FileUploadController ~ file:", file)
      if (
        file &&
        !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|pdf|PDF|svg)$/)
      ) {
        throw TypeExceptions.InvalidFileEXT(
          RESPONSE_ERROR.FILE_INVALID_EXTENSION,
        );
      } else {
        console.log(imageBase.imageBaseType)
        if (imageBase.imageBaseType == UploadEnum.local) {
          const result =   await this.fileUploadService.uploadFile(
            file,
            params
          );
          console.log("🚀 ~ FileUploadController ~ result:", result)
          return result
        }
      }
    } 
  }

