import {  Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as rimraf from "rimraf";
import * as path from "path";
import { CommonService } from "../services/common.service";

@Injectable()
export class FileUploadService {
  constructor(private commonService: CommonService) {}

  /**
   * This function is for upload file or image in local
   * @param file
   * @param body
   */
  async uploadFile( file, body) {
      if (!fs.existsSync(`./uploads/${body.moduleName}`)) {
        fs.mkdirSync(`./uploads/${body.moduleName}`, {
          recursive: true,
        });
      } else {
        const random = this.commonService.generateRandomString(8, "number");
        const extension = path.extname(file.filename);
        const fileName = random + extension;
        fs.copyFile(
          file.path,
          `./uploads/${body.moduleName}/${fileName}`,
          (err) => {
            if (err) {
              console.log("err:", err);
            } else {
              rimraf(file.path, () => {
                /** */
              });
            }
          }
        );
        return {
          name: fileName,
        };
      }
    } 
  }

