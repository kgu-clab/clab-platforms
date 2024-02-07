export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

export const END_POINT = {
  LOGIN_REISSUE: '/login/reissue',
  MY_PROFILE: '/members/my-profile',
  MY_BOARDS: '/boards/my-boards',
  MY_NOTIFICATION: '/notifications',
  MY_COMMENTS: '/comments/my-comments',
  MY_INFO_EDIT: (id: string) => `/members/${id}`,
  BOOK_LIST: `/books`,
  MY_COMMUNITY: `/boards`,
  MY_NEWS: `/news`,
  MY_BLOG: `/blogs`,
  MY_HIRE: `/job-postings`,
  MY_BIRTHDAY: `/members/birthday`,
  MY_ACTIVITY: `/schedule/activity`,
  MAIN_SCHEDULE: `/schedule`,
  MAIN_ACTIVITY_PHOTO: `/activity-photos`,
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
