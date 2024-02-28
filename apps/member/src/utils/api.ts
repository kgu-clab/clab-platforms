import {
  ACCESS_TOKEN_KEY,
  API_BASE_URL,
  REFRESH_TOKEN_KEY,
} from '@constants/api';

export const createPath = (...path: Array<string | number>): string => {
  return path
    .map((path, index) => {
      const pathStr = path.toString();
      const prefix = index > 0 && !pathStr.startsWith('?') ? '/' : '';
      return prefix + pathStr;
    })
    .join('')
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

/**
 * 문자열이 base64 형식인지 확인합니다.
 *
 * @param {string} string - 확인할 문자열입니다.
 * @returns {boolean} - 문자열이 base64 형식이면 true, 아니면 false를 반환합니다.
 */
export const isBase64 = (url: string) => /;base64,/.test(url);

export const createImageUrl = (imageUrl: string) => {
  if (isBase64(imageUrl)) return imageUrl;
  return imageUrl.startsWith(API_BASE_URL)
    ? imageUrl
    : createPath(API_BASE_URL, imageUrl);
};
