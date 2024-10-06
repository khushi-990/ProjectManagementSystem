import { IList } from 'components/common/interface/list.interface';

import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { IAddProjectReq, IEditProjectReq, IProject, IProjectRes } from './types';

export const projectAPI = {
  async projectList(data: IList): Promise<IProjectRes> {
    return apiInstance
      .post(ApiEndPoints.project.projectList, data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async projectDetail(id: string): Promise<IProject> {
    return apiInstance
      .get(`${ApiEndPoints.project.projectDetail}/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async projectAdd(data: IAddProjectReq): Promise<IApiSuccess<IProject>> {
    return apiInstance
      .post(`${ApiEndPoints.project.projectAdd}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async projectUpdate(data: IEditProjectReq): Promise<IApiSuccess<IProject>> {
    return apiInstance
      .patch(`${ApiEndPoints.project.projectEdit}/${data._id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async projectDelete(id: string): Promise<IApiSuccess<IProject>> {
    return apiInstance
      .delete(`${ApiEndPoints.project.projectDelete}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};
