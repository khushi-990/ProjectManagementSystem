import { useQueryClient } from '@tanstack/react-query';

import { authStore } from 'services/store/auth';

const useLogout = () => {
  const queryClient = useQueryClient();
  const {
    actions: { authFail }
  } = authStore((state) => state);

  const handleSignOut = () => {
    queryClient.clear();
    authFail();
  };

  return { handleLogout: handleSignOut };
};

export default useLogout;
