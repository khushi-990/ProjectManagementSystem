import { profileAPI } from 'services/api/profile';

import { useRequest } from '..';
import { profileKey } from '../queryKeys';

export const useUploadProfile = () => {
  return useRequest({
    mutationFn: profileAPI.uploadImage,
    mutationKey: profileKey.profileUpload,
  });
};
