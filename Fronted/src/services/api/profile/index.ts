import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { IUploadImageRes } from './types';

export const profileAPI = {
  async uploadImage(data: FormData): Promise<IUploadImageRes> {
    return apiInstance
      .post(`${ApiEndPoints.uploadIImage.uploadImage}`, data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },
};
