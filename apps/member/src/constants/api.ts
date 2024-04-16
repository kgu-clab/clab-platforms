import type { IDType } from '@type/api';

export const SERVER_BASE_URL: string = import.meta.env.VITE_SERVER_BASE_URL;
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

export const FORM_DATA_KEY = 'multipartFile';
export const STORAGE_PERIOD = (period: number) => `?storagePeriod=${period}`;
export const MAX_PAGINATION_SIZE = 99999;

export const END_POINT = {
  LOGIN_REISSUE: '/v1/login/reissue',
  MEMBERS: '/v1/members',
  // -- 마이페이지
  MY_PROFILE: '/v1/members/my-profile',
  MY_BOARDS: '/v1/boards/my-boards',
  MY_NOTIFICATION: '/v1/notifications',
  MY_COMMENTS: '/v1/comments/my-comments',
  MY_INFO_EDIT: (id: IDType) => `/v1/members/${id}`,
  // -- 커뮤니티
  BOARDS: `/v1/boards`,
  BOARDS_LIST: `/v1/boards/category`,
  BOARDERS_ITEM: (id: IDType) => `/v1/boards/${id}`,
  // -- 도서
  BOOK: `/v1/books`,
  BOOK_DETAIL: (id: number) => `/v1/books/${id}`,
  BOOK_LOAN_BORROW: `/v1/book-loan-records`,
  BOOK_LOAN_CONDITIONS: `/v1/book-loan-records/conditions`,
  BOOK_LOAN_EXTEND: `/v1/book-loan-records/extend`,
  BOOK_LOAN_RETURN: `/v1/book-loan-records/return`,
  BOOK_LOAN_OVERDUE: `/v1/book-loan-records/overdue`,
  // -- 블로그
  BLOG: `/v1/blogs`,
  BLOG_DETAIL: (id: number) => `/v1/blogs/${id}`,
  ACCUSES: '/v1/accuses',
  MY_NEWS: `/v1/news`,
  MY_HIRE: `/v1/job-postings`,
  MY_BIRTHDAY: `/v1/members/birthday`,
  MY_ACTIVITY: `/v1/schedule/activity`,
  MAIN_SCHEDULE: `/v1/schedule`,
  SCHEDULE_COLLECT: `/v1/schedule/collect`,
  MAIN_ACTIVITY_PHOTO: `/v1/activity-photos`,
  // -- 회비
  MEMBERSHIP_FEE: `/v1/membership-fees`,
  MEMBERSHIP_FEE_ID: (id: number) => `/v1/membership-fees/${id}`,
  // -- 공유 계정
  SHARED_ACCOUNT: `/v1/shared-accounts`,
  SHARED_ACCOUNT_STATUS: (usageId: number) =>
    `/v1/shared-accounts/usage/${usageId}`,
  COMMENTS: (id: IDType) => `/v1/comments/${id}`,
  HIRE: (id: IDType) => `/v1/job-postings/${id}`,
  NEWS: (id: IDType) => `/v1/news/${id}`,
  // -- 파일 업로드
  UPLOADEDFILE_ACTIVITY_ASSIGNMENT: (groupId: IDType, boardId: IDType) =>
    `/v1/files/assignment/${groupId}/${boardId}`,
  UPLOADEDFILE_MEMBERSHIP_FEE: '/v1/files/membership-fee',
  UPLOADEDFILE_PROFILES: '/v1/files/profiles',
  // -- 활동그룹 멤버
  ACTIVITY_GROUP_MEMBER: (id: IDType) => `/v1/activity-group/member/${id}`,
  ACTIVITY_GROUP_MEMBER_MY: `/v1/activity-group/member/my`,
  ACTIVITY_GROUP_MEMBER_STATUS: `/v1/activity-group/member/status`,
  ACTIVITY_GROUP_MEMBER_APPLY: `/v1/activity-group/member/apply`,
  ACTIVITY_GROUP_MEMBER_MEMBERS: `/v1/activity-group/member/members`,
  // -- 활동그룹 관리
  ACTIVITY_GROUP_ADMIN_MEMBERS: `/v1/activity-group/admin/members`,
  ACTIVITY_GROUP_ADMIN_ACCEPT: `/v1/activity-group/admin/accept`,
  // -- 활동그룹 게시판
  ACTIVITY_GROUP_BOARD: `/v1/activity-group/boards`,
  ACTIVITY_GROUP_BOARDS: `/v1/activity-group/boards`,
  ACTIVITY_GROUP_BOARD_BY_PARENT: `/v1/activity-group/boards/by-parent`,
  ACTIVITY_GROUP_BOARD_BY_CATEGORY: `/v1/activity-group/boards/by-category`,
  ACTIVITY_GROUP_BOARDS_MY_ASSIGNMENT: `/v1/activity-group/boards/my-assignment`,
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
  CLAB_AUTH_SUCCESS: 1200,
} as const;
