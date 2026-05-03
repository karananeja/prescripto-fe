import { Navigate } from 'react-router-dom';

import { useAppContext } from '../context/AppContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { children } = props;

  const { token } = useAppContext();

  if (!token) return <Navigate to='/login' />;

  return <>{children}</>;
};
