import { Key } from 'react';

import { IList } from 'components/common/interface/list.interface';

export interface ITask {
  _id: string;
  name: string;
  description: string;
  priority: string;
  projectId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskRes {
  taskList: ITask[];
  records_total: number;
}

export interface IAddTaskReq {
  title: string;
  description: string;
  priority: string;
  projectId: string;
}

export interface IAddTaskRes {}

export interface IEditTaskReq {
  _id: string;
  title: string;
  description: string;
  priority: string;
}

export interface IEditTaskRes {}
