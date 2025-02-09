import { useLayoutEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { server } from '@api/server';
import { PATH } from '@constants/path';
import { useSetIsLoggedInStore } from '@store/auth';
import { authorization, removeTokens, setTokens } from '@utils/api';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const setIsLoggedIn = useSetIsLoggedInStore();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    // URL 쿼리 파라미터에서 토큰을 가져옵니다.
    const accessToken = searchParams.get('a');
    const refreshToken = searchParams.get('r');

    if (accessToken && refreshToken) {
      // 정상적으로 로그인이 되어 해당 페이지로 리다이렉션이 됐을 경우
      // 토큰이 있으면 토큰을 저장하고 메인 페이지로 이동합니다.
      setTokens(accessToken, refreshToken);
      server.setHeaders(authorization(accessToken));
      setIsLoggedIn(true);
      navigate(PATH.MAIN);
    } else {
      // 토큰이 없으면 로그인 페이지로 이동합니다.
      removeTokens();
      setIsLoggedIn(false);
      navigate(PATH.LOGIN);
    }
  }, [navigate, searchParams, setIsLoggedIn]);

  return <h1>로그인 중...</h1>;
}
