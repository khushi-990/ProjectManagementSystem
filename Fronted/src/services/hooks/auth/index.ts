import { authAPI } from 'services/api/auth';

import { useRequest } from '..';
import { authKeys } from '../queryKeys';

export const useSignIn = () => {
  return useRequest({
    mutationKey: authKeys.signin,
    mutationFn: authAPI.signIn
  });
};

export const useRegister = () => {
  return useRequest({
    mutationKey: authKeys.register,
    mutationFn: authAPI.register
  });
};
