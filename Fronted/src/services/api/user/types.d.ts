import { Key } from 'react';

import { IRegisterReq } from '../auth/types';

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  profilePic: string | null;
}

export interface IUserRes {
  userList: IUser[];
  total_records: number;
}

export interface IEditUserReq extends IRegisterReq {
  profilePic?: string | null;
  gender: string;
  _id: string;
}
