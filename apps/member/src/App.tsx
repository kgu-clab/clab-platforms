import { useEffect, useState } from 'react';
import { useToken } from '@hooks/common/useToken';
import AppRouter from '@router/AppRouter';
import { useSetIsLoggedInStore } from '@store/auth';

const App = () => {
  const setIsLoggedIn = useSetIsLoggedInStore();
  const [accessToken, refreshToken] = useToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [accessToken, refreshToken, setIsLoggedIn]);

  if (isLoading) {
    return null;
  }

  return <AppRouter />;
};

export default App;
