import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@constants/api';
import { PATH } from '@constants/path';
import { useSetIsLoggedInStore } from '@store/auth';
import { server } from '@api/server';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const setIsLoggedIn = useSetIsLoggedInStore();
  const navigate = useNavigate();

  useEffect(() => {
    // URL 쿼리 파라미터에서 토큰을 가져옵니다.
    const accessToken = searchParams.get('a');
    const refreshToken = searchParams.get('r');

    if (accessToken && refreshToken) {
      // 정상적으로 로그인이 되어 해당 페이지로 리다이렉션이 됐을 경우
      // 토큰이 있으면 토큰을 저장하고 메인 페이지로 이동합니다.
      sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      server.setHeaders({ Authorization: `Bearer ${accessToken}` });
      setIsLoggedIn(true);
      navigate(PATH.MAIN);
      return;
    } else {
      // 토큰이 없으면 로그인 페이지로 이동합니다.
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
      setIsLoggedIn(false);
      navigate(PATH.LOGIN);
      return;
    }
  }, [navigate, searchParams, setIsLoggedIn]);

  return <h1>로그인 중...</h1>;
};

export default AuthPage;
