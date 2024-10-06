import { authStore } from 'services/store/auth';

import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { IRegisterReq, ISignInReq, ISignInRes } from './types';

const { actions } = authStore.getState();

export const authAPI = {
  // SignIn
  async signIn(data: ISignInReq): Promise<IApiSuccess<ISignInRes>> {
    return apiInstance
      .post(ApiEndPoints.auth.signIn, data)
      .then((response) => {
        actions.authSuccess(response);
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async register(data: IRegisterReq): Promise<IApiSuccess<ISignInRes>> {
    return apiInstance
      .post(ApiEndPoints.auth.register, data)
      .then((response) => {
        actions.authSuccess(response);
        return response;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};
