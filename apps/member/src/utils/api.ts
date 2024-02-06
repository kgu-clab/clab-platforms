import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@constants/api';

export const createPagination = (
  endpoint: string,
  page: number,
  size: number,
) => {
  return `${endpoint}?page=${page}&size=${size}`;
};

export const createBirthdayPagination = (
  endpoint: string,
  month: number,
  page: number,
  size: number,
) => {
  return `${endpoint}?month=${month}&page=${page}&size=${size}`;
};

export const createSchedulePagination = (
  endpoint: string,
  startDateTime: string,
  endDateTime: string,
  page: number,
  size: number,
) => {
  return `${endpoint}?startDateTime=${startDateTime}&endDateTime=${endDateTime}&page=${page}&size=${size}`;
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

export const authorization = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
