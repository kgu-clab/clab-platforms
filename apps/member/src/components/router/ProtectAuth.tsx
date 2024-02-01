import { PATH } from '@constants/path';
import { useGetIsLoggedInStore } from '@store/auth';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectAuthProps {
  protect?: boolean;
  children?: React.ReactNode;
}

/**
 * protect가 true일 경우 로그인 상태일 경우만 접근 가능한 페이지
 * false일 경우 로그인 상태일 경우 접근 불가능한 페이지
 */
const ProtectAuth = ({ protect = false, children }: ProtectAuthProps) => {
  const isLoggedIn = useGetIsLoggedInStore();

  if (protect && !isLoggedIn) {
    // 로그인이 필요한 페이지에 로그인이 되어있지 않은 경우
    return <Navigate to={PATH.LOGIN} />;
  } else if (!protect && isLoggedIn) {
    // 로그인이 되어있는데, 로그인이 없어야 하는 페이지에 접근한 경우
    return <Navigate to={PATH.MAIN} />;
  }

  if (children) {
    return children;
  }

  return <Outlet />;
};

export default ProtectAuth;
