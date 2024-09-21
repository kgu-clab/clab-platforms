import { useEffect, useState } from 'react';

import { server } from '@api/server';
import { useToken } from '@hooks/common/useToken';
import { Routes } from '@pages/Routes';
import { useSetIsLoggedInStore } from '@store/auth';
import { authorization } from '@utils/api';

const App = () => {
  const setIsLoggedIn = useSetIsLoggedInStore();
  const [accessToken, refreshToken] = useToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
      server.setHeaders(authorization(accessToken));
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [accessToken, refreshToken, setIsLoggedIn]);

  if (isLoading) {
    return null;
  }

  return <Routes />;
};

export default App;
