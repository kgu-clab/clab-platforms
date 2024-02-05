export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

export const END_POINT = {
  LOGIN_REISSUE: '/login/reissue',
  MY_BOARDS: '/boards/my-boards',
  MY_NOTIFICATION: '/notifications',
  MY_COMMENTS: '/comments/my-comments',
  MY_INFO_EDIT: (id: string) => `/members/${id}`,
  MY_BOOKS: `/book-loan-records`,
};

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONTENT_TOO_LARGE: 413,
  INTERNAL_SERVER_ERROR: 500,
};
