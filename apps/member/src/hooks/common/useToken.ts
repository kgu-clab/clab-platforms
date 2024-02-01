import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@constants/api';

export const useToken = () => {
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);

  if (!accessToken || !refreshToken) {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  return [accessToken, refreshToken] as const;
};
