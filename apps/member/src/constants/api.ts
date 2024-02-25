export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

export const END_POINT = {
  LOGIN_REISSUE: '/login/reissue',
  // -- 마이페이지
  MY_PROFILE: '/members/my-profile',
  MY_BOARDS: '/boards/my-boards',
  MY_NOTIFICATION: '/notifications',
  MY_COMMENTS: '/comments/my-comments',
  MY_INFO_EDIT: (id: string) => `/members/${id}`,
  // -- 커뮤니티
  BOARDS: `/boards`,
  BOARDS_LIST: `/boards/list`,
  BOARDERS_ITEM: (id: string) => `/boards/${id}`,
  ACCUSES: '/accuses',
  BOOK: `/books`,
  BOOK_DETAIL: (id: string) => `/books/${id}`,
  BOOK_LOAN: `/book-loan-records`,
  MY_NEWS: `/news`,
  MY_BLOG: `/blogs`,
  MY_HIRE: `/job-postings`,
  MY_BIRTHDAY: `/members/birthday`,
  MY_ACTIVITY: `/schedule/activity`,
  MAIN_SCHEDULE: `/schedule`,
  MAIN_ACTIVITY_PHOTO: `/activity-photos`,
  COMMENTS: (id: string) => `/comments/${id}`,
  MEMBERSHIP_FEE: `/membership-fees`,
  UPLOADEDFILE_MEMBERSHIP_FEE: `/files/membership-fee`,
  HIRE: (jobPostingId: string) => `/job-postings/${jobPostingId}`,
  NEWS: (newsId: string) => `/news/${newsId}`,
} as const;

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONTENT_TOO_LARGE: 413,
  INTERNAL_SERVER_ERROR: 500,
} as const;
