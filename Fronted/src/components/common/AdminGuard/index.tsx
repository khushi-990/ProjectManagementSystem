import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { authStore } from 'services/store/auth';

import { ROUTES } from 'utils/constants/routes';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn, userData } = authStore((state) => state);

  useEffect(() => {
    if (isLoggedIn && userData?.userType !== 'Admin') {
      navigate(ROUTES.signIn, { replace: true });
    }
  }, [userData?.userType, navigate, isLoggedIn]);
  if (isLoggedIn && userData?.userType === 'Admin') return <>{children}</>;
  else {
    navigate(ROUTES.signIn, { replace: true });
  }
};

export default AdminGuard;
