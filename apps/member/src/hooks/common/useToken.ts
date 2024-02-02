import { getAccessToken, getRefreshToken, removeTokens } from '@utils/api';

export const useToken = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken) {
    removeTokens();
  }

  return [accessToken, refreshToken] as const;
};
