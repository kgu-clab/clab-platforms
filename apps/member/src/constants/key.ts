import { WithPaginationParams } from '@type/api';
import type { CommunityCategoryType } from '@type/community';

export const ATOM_KEY = {
  IS_LOGGED_IN: 'isLoggedInState',
  MODAL: 'modalState',
  TOAST: 'toastState',
} as const;

export const QUERY_KEY = {
  ORGANIZATION: 'Organization',
  NEWS: 'News',
  BLOG: 'Blog',
  HIRE: 'Hire',
  BIRTHDAY: 'Birthday',
  SCHEDULE: 'Schedule',
  SCHEDULE_COLLECT: 'ScheduleCollect',
  MAIN_ACTIVITY_PHOTO: 'MainActivityPhoto',
  // 활동
  ACTIVITY: 'Activity',
  ACTIVITY_BOARDS: 'ActivityBoards',
  ACTIVITY_GROUP_MY: 'ActivityGroupMy',
  ACTIVITY_GROUP_APPLY: 'ActivityGroupApply',
  ACTIVITY_BOARDS_MY_ASSIGNMENT: 'ActivityBoardsMyAssignment',
} as const;

/**
 * 회원 정보 관련 쿼리 키
 */
export const MEMBER_QUERY_KEY = {
  ALL: ['Profile'],
  MY: () => [...MEMBER_QUERY_KEY.ALL, 'my'],
  COMMENTS: () => [...MEMBER_QUERY_KEY.ALL, 'comments'],
  MEMBERS: () => [...MEMBER_QUERY_KEY.ALL, 'members'],
  MEMBER: (memberId: string) => [...MEMBER_QUERY_KEY.MEMBERS(), memberId],
} as const;

/**
 * 알림 관련 쿼리 키
 */
export const NOTIFICATION_QUERY_KEY = {
  ALL: ['Notification'],
  NOTIFICATIONS: () => [...NOTIFICATION_QUERY_KEY.ALL, 'notifications'],
  NOTIFICATION: (notificationId: string) => [
    ...NOTIFICATION_QUERY_KEY.NOTIFICATIONS(),
    notificationId,
  ],
} as const;

/**
 * 내가 대여한 도서 목록의 쿼리 키
 */
export const MY_BOOK_QUERY_KEY = {
  ALL: ['MyBook'],
  BOOKS: () => [...MY_BOOK_QUERY_KEY.ALL, 'books'],
  BOOK: (memberId: string, pagination: WithPaginationParams) => [
    ...MY_BOOK_QUERY_KEY.BOOKS(),
    memberId,
    pagination,
  ],
} as const;

/**
 * 회비 관련 쿼리 키
 */
export const MEMBERSHIP_FEE_QUERY_KEY = {
  ALL: ['MembershipFee'],
  PAGES: () => [...MEMBERSHIP_FEE_QUERY_KEY.ALL, 'pages'],
  PAGE: (pagination: WithPaginationParams) => [
    ...MEMBERSHIP_FEE_QUERY_KEY.PAGES(),
    pagination,
  ],
} as const;

/**
 * 활동 관련 쿼리 키
 */
export const ACTIVITY_QUERY_KEY = {
  ALL: ['Activity'],
  MY: () => [...ACTIVITY_QUERY_KEY.ALL, 'my'],
} as const;

/**
 * 게시판 관련 쿼리 키
 */
export const BOARD_QUERY_KEY = {
  ALL: ['Board'],
  MY: () => [...BOARD_QUERY_KEY.ALL, 'my'],
  LISTS: () => [...BOARD_QUERY_KEY.ALL, 'lists'],
  DETAILS: () => [...BOARD_QUERY_KEY.ALL, 'detail'],
  COLLECTIONS: () => [...BOARD_QUERY_KEY.ALL, 'collection'],
  CATEGORIES: () => [...BOARD_QUERY_KEY.ALL, 'category'],
  LIST: (id: number) => [...BOARD_QUERY_KEY.LISTS(), id],
  DETAIL: (id: number) => [...BOARD_QUERY_KEY.DETAILS(), id],
  COLLECTION: (pagination: WithPaginationParams) => [
    ...BOARD_QUERY_KEY.COLLECTIONS(),
    pagination,
  ],
  CATEGORY: (category: CommunityCategoryType) => [
    ...BOARD_QUERY_KEY.CATEGORIES(),
    category,
  ],
} as const;

/**
 * 댓글 관련 쿼리 키
 */
export const COMMENT_QUERY_KEY = {
  ALL: ['Comment'],
  DETAILS: () => [...COMMENT_QUERY_KEY.ALL, 'detail'],
  DETAIL: (id: number) => [...COMMENT_QUERY_KEY.DETAILS(), id],
} as const;

/**
 * 도서 관련 쿼리 키
 */
export const BOOK_QUERY_KEY = {
  ALL: ['Book'],
  LISTS: () => [...BOOK_QUERY_KEY.ALL, 'lists'],
  DETAILS: () => [...BOOK_QUERY_KEY.ALL, 'detail'],
  LIST: (pagination: WithPaginationParams) => [
    ...BOOK_QUERY_KEY.LISTS(),
    pagination,
  ],
  DETAIL: (id: number) => [...BOOK_QUERY_KEY.DETAILS(), id],
} as const;

/**
 * 도서 대출 기록 관련 쿼리 키
 */
export const BOOK_LOAN_RECORD_QUERY_KEY = {
  ALL: ['BookLoanRecord'],
  BOOKS: () => [...BOOK_LOAN_RECORD_QUERY_KEY.ALL, 'books'],
  BORROWERS: () => [...BOOK_LOAN_RECORD_QUERY_KEY.ALL, 'borrowers'],
  OVERDUE_PAGE: () => [...BOOK_LOAN_RECORD_QUERY_KEY.ALL, 'overdue'],
  BOOK: (bookId?: number) => [...BOOK_LOAN_RECORD_QUERY_KEY.BOOKS(), bookId],
  BORROWER: (borrowerId: string) => [
    ...BOOK_LOAN_RECORD_QUERY_KEY.BORROWERS(),
    borrowerId,
  ],
  OVERDUE: (pagination: WithPaginationParams) => [
    ...BOOK_LOAN_RECORD_QUERY_KEY.OVERDUE_PAGE(),
    pagination,
  ],
} as const;
