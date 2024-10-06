import { setAxiosInterceptor } from 'services/api';
import { ISignInRes } from 'services/api/auth/types';
import { authStore } from 'services/store/auth';

import { LocalStorageKeys } from './constants';

const { actions } = authStore.getState();

//To concate the path for the public folder
export const toAbsoluteUrl = (pathname: string) => window.location.origin + pathname;

export const setupAxios = () => {
  const userStorage: ISignInRes = JSON.parse(localStorage.getItem(LocalStorageKeys.user) ?? '{}');

  if (userStorage?.accessToken) {
    actions.authSuccess({ data: userStorage });
  } else {
    actions.authFail();
  }

  // Set Axios Interceptor
  setAxiosInterceptor();
};

export const appLoader = (status: boolean) => actions.loaderChange(status);

export const scrollToBottom = (scrollRef: HTMLElement | undefined) => {
  if (!scrollRef) return;
  scrollRef.scrollTop = scrollRef.scrollHeight;
};

export const scrollToTop = (scrollRef: HTMLElement | undefined | null) => {
  if (!scrollRef) return;
  scrollRef.scrollTop = 0;
};
