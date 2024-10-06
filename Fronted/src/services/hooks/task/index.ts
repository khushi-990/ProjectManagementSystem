import { IList } from 'components/common/interface/list.interface';

import { taskAPI } from 'services/api/task';

import { useFetch, useRequest } from '..';
import { taskKeys } from '../queryKeys';

export const useTaskList = (data: IList) => {
  return useFetch({
    queryFn: () => taskAPI.taskList(data),
    queryKey: taskKeys.taskList(data),
    queryOptions: {
      staleTime: Infinity,
      retry: false,
      enabled: Boolean(data?.projectId)
    }
  });
};

export const useTaskDetail = (id: string) => {
  return useFetch({
    queryFn: () => taskAPI.taskDetail(id),
    queryKey: taskKeys.taskDetail(id),
    queryOptions: {
      staleTime: Infinity,
      retry: false,
      enabled: Boolean(id)
    }
  });
};

export const useCreteTask = () => {
  return useRequest({
    mutationKey: taskKeys.taskAdd,
    mutationFn: taskAPI.taskAdd
  });
};

export const useUpdateTask = () => {
  return useRequest({
    mutationKey: taskKeys.taskUpdate,
    mutationFn: taskAPI.taskUpdate
  });
};

export const useDeleteTask = () => {
  return useRequest({
    mutationKey: taskKeys.taskDelete,
    mutationFn: taskAPI.taskDelete
  });
};
