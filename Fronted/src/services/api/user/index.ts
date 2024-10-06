import { IList } from 'components/common/interface/list.interface';

import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { IEditUserReq, IUser, IUserRes } from './types';

export const userAPI = {
  async userList(data: IList): Promise<IUserRes> {
    return apiInstance
      .post(ApiEndPoints.user.userList, data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async userDetail(id: string): Promise<IUser> {
    return apiInstance
      .get(`${ApiEndPoints.user.userDetail}/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async userUpdate(data: IEditUserReq): Promise<IApiSuccess<IUser>> {
    return apiInstance
      .patch(`${ApiEndPoints.user.userEdit}/${data._id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async userDelete(id: string): Promise<IApiSuccess<IUser>> {
    return apiInstance
      .delete(`${ApiEndPoints.user.userDelete}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async userAllList(): Promise<IUser[]> {
    return apiInstance
      .get(ApiEndPoints.user.userAll)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};
