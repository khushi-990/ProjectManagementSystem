import { IList } from 'components/common/interface/list.interface';

import { userAPI } from 'services/api/user';

import { useFetch, useRequest } from '..';
import { userKeys } from '../queryKeys';

export const useUserList = (data: IList) => {
  return useFetch({
    queryFn: () => userAPI.userList(data),
    queryKey: userKeys.userList(data),
    queryOptions: {
      staleTime: Infinity,
      retry: false
    }
  });
};

export const useUserAllList = () => {
  return useFetch({
    queryFn: () => userAPI.userAllList(),
    queryKey: userKeys.userAll,
    queryOptions: {
      staleTime: Infinity,
      retry: false
    }
  });
};

export const useUserDetail = (id: string) => {
  return useFetch({
    queryFn: () => userAPI.userDetail(id),
    queryKey: userKeys.userDetail(id),
    queryOptions: {
      staleTime: Infinity,
      retry: false,
      enabled: Boolean(id)
    }
  });
};

export const useUpdateUser = () => {
  return useRequest({
    mutationKey: userKeys.userUpdate,
    mutationFn: userAPI.userUpdate
  });
};

export const useDeleteUser = () => {
  return useRequest({
    mutationKey: userKeys.userDelete,
    mutationFn: userAPI.userDelete
  });
};
