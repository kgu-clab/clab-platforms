import type { IDType } from '@type/api';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
export const FORM_DATA_KEY = 'multipartFile';

export const STORAGE_PERIOD = (period: number) => `?storagePeriod=${period}`;

export const END_POINT = {
  LOGIN_REISSUE: '/login/reissue',
  // -- 마이페이지
  MY_PROFILE: '/members/my-profile',
  MY_BOARDS: '/boards/my-boards',
  MY_NOTIFICATION: '/notifications',
  MY_COMMENTS: '/comments/my-comments',
  MY_INFO_EDIT: (id: IDType) => `/members/${id}`,
  // -- 커뮤니티
  BOARDS: `/boards`,
  BOARDS_LIST: `/boards/list`,
  BOARDERS_ITEM: (id: IDType) => `/boards/${id}`,
  ACCUSES: '/accuses',
  BOOK_LIST: `/books`,
  MY_NEWS: `/news`,
  MY_BLOG: `/blogs`,
  MY_HIRE: `/job-postings`,
  MY_BIRTHDAY: `/members/birthday`,
  MY_ACTIVITY: `/schedule/activity`,
  MAIN_SCHEDULE: `/schedule`,
  MAIN_ACTIVITY_PHOTO: `/activity-photos`,
  MEMBERSHIP_FEE: `/membership-fees`,
  UPLOADEDFILE_MEMBERSHIP_FEE: `/files/membership-fee`,
  UPLOADEDFILE_ACTIVITY_ASSIGNMENT: (groupId: IDType, boardId: IDType) =>
    `/files/assignment/${groupId}/${boardId}`,
  COMMENTS: (id: IDType) => `/comments/${id}`,
  HIRE: (id: IDType) => `/job-postings/${id}`,
  NEWS: (id: IDType) => `/news/${id}`,
  ACTIVITY_GROUP_MEMBER_STATUS: `/activity-group/member/status`,
  ACTIVITY_GROUP_MEMBER: (id: IDType) => `/activity-group/member/${id}`,
  ACTIVITY_GROUP_BOARD_BY_CATEGORY: `/activity-group/boards/by-category`,
  ACTIVITY_GROUP_MEMBER_APPLY: `/activity-group/member/apply`,
  ACTIVITY_GROUP_BOARD_BY_PARENT: `/activity-group/boards/by-parent`,
  ACTIVITY_GROUP_MEMBER_MEMBERS: `/activity-group/member/members`,
  ACTIVITY_GROUP_ADMIN_MEMBERS: `/activity-group/admin/members`,
  ACTIVITY_GROUP_ADMIN_ACCEPT: `/activity-group/admin/accept`,
  ACTIVITY_GROUP_BOARDS: `/activity-group/boards`,
  ACTIVITY_GROUP_BOARDS_MY_ASSIGNMENT: `activity-group/boards/my-assignment`,
  ACTIVITY_GROUP_BOARD: `/activity-group/boards`,
};

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
  CLAB_AUTH_SUCCESS: 1200,
};
