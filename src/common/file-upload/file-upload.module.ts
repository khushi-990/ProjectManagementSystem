import { Module } from "@nestjs/common";
import { FileUploadController } from "./file-upload.controller";
import { CommonService } from "src/common/services/common.service";
import { FileUploadService } from "./file-upload.service";

@Module({
  controllers: [FileUploadController],
  providers: [CommonService, FileUploadService],
})
export class FileUploadModule {}
