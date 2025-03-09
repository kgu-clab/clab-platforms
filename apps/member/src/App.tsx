import { useEffect, useState } from 'react';

import { server } from '@api/server';
import { useIsLoggedIn } from '@hooks/common/useIsLoggedIn';
import { useToken } from '@hooks/common/useToken';
import { Routes } from '@pages/Routes';
import { authorization } from '@utils/api';

const App = () => {
  const { updateLogged } = useIsLoggedIn();
  const [accessToken, refreshToken] = useToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (accessToken && refreshToken) {
      updateLogged(true);
      server.setHeaders(authorization(accessToken));
    } else {
      updateLogged(false);
    }
    setIsLoading(false);
  }, [accessToken, refreshToken, updateLogged]);

  if (isLoading) {
    return null;
  }

  return <Routes />;
};

export default App;
