import { IList } from 'components/common/interface/list.interface';

import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { IAddTaskReq, IEditTaskReq, ITask, ITaskRes } from './types';

export const taskAPI = {
  async taskList(data: IList): Promise<ITaskRes> {
    return apiInstance
      .post(ApiEndPoints.task.taskList, data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async taskDetail(id: string): Promise<ITask> {
    return apiInstance
      .get(`${ApiEndPoints.task.taskDetail}/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async taskAdd(data: IAddTaskReq): Promise<IApiSuccess<ITask>> {
    return apiInstance
      .post(`${ApiEndPoints.task.taskAdd}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async taskUpdate(data: IEditTaskReq): Promise<IApiSuccess<ITask>> {
    return apiInstance
      .patch(`${ApiEndPoints.task.taskEdit}/${data?._id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async taskDelete(id: string): Promise<IApiSuccess<ITask>> {
    return apiInstance
      .delete(`${ApiEndPoints.task.taskDelete}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};
