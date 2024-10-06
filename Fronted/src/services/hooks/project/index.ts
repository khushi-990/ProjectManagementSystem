import { IList } from 'components/common/interface/list.interface';

import { projectAPI } from 'services/api/projects';

import { useFetch, useRequest } from '..';
import { projectKeys } from '../queryKeys';

export const useProjectList = (data: IList) => {
  return useFetch({
    queryFn: () => projectAPI.projectList(data),
    queryKey: projectKeys.projectList(data),
    queryOptions: {
      staleTime: Infinity,
      retry: false
    }
  });
};

export const useProjectDetail = (id: string) => {
  return useFetch({
    queryFn: () => projectAPI.projectDetail(id),
    queryKey: projectKeys.projectDetail(id),
    queryOptions: {
      staleTime: Infinity,
      retry: false,
      enabled: Boolean(id)
    }
  });
};

export const useCreteProject = () => {
  return useRequest({
    mutationKey: projectKeys.projectAdd,
    mutationFn: projectAPI.projectAdd
  });
};

export const useUpdateProject = () => {
  return useRequest({
    mutationKey: projectKeys.projectUpdate,
    mutationFn: projectAPI.projectUpdate
  });
};

export const useDeleteProject = () => {
  return useRequest({
    mutationKey: projectKeys.projectDelete,
    mutationFn: projectAPI.projectDelete
  });
};
