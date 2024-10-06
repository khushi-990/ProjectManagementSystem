import { Key } from 'react';

export interface IProject {
  _id: string;
  title: string;
  userIds:  Array<string>;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectRes {
  projectList: IProject[];
  records_total: number;
}

export interface IAddProjectReq {
  title: string;
  description: string;
  userIds: Array<string>;
}

export interface IAddProjectRes {}

export interface IEditProjectReq extends IAddProjectReq {
  _id: string;
  removeIds: Array<string>;
}

export interface IEditProjectRes {}
