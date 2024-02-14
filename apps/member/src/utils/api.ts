import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@constants/api';

export const createPath = (...path: Array<string | number>): string => {
  return path
    .map((path) => {
      if (typeof path === 'string' || typeof path === 'number') {
        return path.toString();
      }
      throw new Error('Invalid path type');
    })
    .join('/')
    .replace(/([^:])\/\/+/g, '$1/');
};

export const createCommonPagination = (
  endpoint: string,
  params: Record<string, string | number | boolean>,
) => {
  let url = `${endpoint}?`;
  Object.keys(params).forEach((key, index) => {
    const value = params[key];
    if (index !== 0) {
      url += '&';
    }
    url += `${key}=${encodeURIComponent(value)}`;
  });
  return url;
};

export const getAccessToken = () => {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const removeTokens = () => {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const authorization = (token: string | null) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
