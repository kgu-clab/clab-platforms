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

export const createCommunityPagination = (
  endpoint: string,
  category: string,
  page: number,
  size: number,
) => {
  return `${endpoint}?category=${category}&page=${page}&size=${size}`;
};

export const createCommentsPagination = (
  endpoint: string,
  boardId: number,
  page: number,
  size: number,
) => {
  return `${endpoint}?boardId=${boardId}&page=${page}&size=${size}`;
};

export const createRecommentsWrtiePagination = (
  endpoint: string,
  parentId: number,
) => {
  return `${endpoint}?parentId=${parentId}`;
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
