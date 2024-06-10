import type { ActivityGroupStatusType } from '@type/activity';
import type { WithPaginationParams } from '@type/api';
import type { CommunityCategoryType } from '@type/community';

export const ATOM_KEY = {
  IS_LOGGED_IN: 'isLoggedInState',
  MODAL: 'modalState',
  TOAST: 'toastState',
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
 * 일정 관련 쿼리 키
 */
export const SCHEDULE_QUERY_KEY = {
  ALL: ['Schedule'],
  MY: () => [...SCHEDULE_QUERY_KEY.ALL, 'my'],
  MONTHS: () => [...SCHEDULE_QUERY_KEY.ALL, 'month'],
  COLLECTS: () => [...SCHEDULE_QUERY_KEY.ALL, 'collect'],
  ACTIVITIES: () => [...SCHEDULE_QUERY_KEY.MY(), 'activity'],
  MONTH: (startDate: string, endDate: string) => [
    ...SCHEDULE_QUERY_KEY.MONTHS(),
    { startDate, endDate },
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
  MY_ASSIGNMENTS: () => [...ACTIVITY_QUERY_KEY.ALL, 'myAssignment'],
  PHOTOS: () => [...ACTIVITY_QUERY_KEY.ALL, 'photo'],
  DETAILS: () => [...ACTIVITY_QUERY_KEY.ALL, 'detail'],
  STATUSES: () => [...BOARD_QUERY_KEY.ALL, 'status'],
  APPLICATIONS: () => [...BOOK_QUERY_KEY.ALL, 'application'],
  BOARDS: () => [...ACTIVITY_QUERY_KEY.ALL, 'board'],
  MY_ASSIGNMENT: (id: number) => [...ACTIVITY_QUERY_KEY.MY_ASSIGNMENTS(), id],
  DETAIL: (id: number) => [...ACTIVITY_QUERY_KEY.DETAILS(), id],
  STATUS: (status: ActivityGroupStatusType) => [
    ...ACTIVITY_QUERY_KEY.STATUSES(),
    status,
  ],
  APPLICATION: (id: number) => [...ACTIVITY_QUERY_KEY.APPLICATIONS(), id],
  BOARD: (id: number) => [...ACTIVITY_QUERY_KEY.BOARDS(), id],
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

/**
 * 생일 관련 쿼리 키
 */
export const BIRTHDAY_QUERY_KEY = {
  ALL: ['Birthday'],
  MONTHS: () => [...BIRTHDAY_QUERY_KEY.ALL, 'months'],
  MONTH: (month: number) => [...BIRTHDAY_QUERY_KEY.MONTHS(), month],
} as const;

/**
 * 블로그 관련 쿼리 키
 */
export const BLOG_QUERY_KEY = {
  ALL: ['Blog'],
  PAGES: () => [...BLOG_QUERY_KEY.ALL, 'pages'],
  DETAILS: () => [...BLOG_QUERY_KEY.ALL, 'detail'],
  PAGE: (pagination: WithPaginationParams) => [
    ...BLOG_QUERY_KEY.PAGES(),
    pagination,
  ],
  DETAIL: (id: number) => [...BLOG_QUERY_KEY.DETAILS(), id],
} as const;

/**
 * 뉴스 관련 쿼리 키
 */
export const NEWS_QUERY_KEY = {
  ALL: ['News'],
  PAGES: () => [...NEWS_QUERY_KEY.ALL, 'pages'],
  DETAILS: () => [...NEWS_QUERY_KEY.ALL, 'detail'],
  PAGE: (pagination: WithPaginationParams) => [
    ...NEWS_QUERY_KEY.PAGES(),
    pagination,
  ],
  DETAIL: (id: number) => [...NEWS_QUERY_KEY.DETAILS(), id],
} as const;

/**
 * 채용 관련 쿼리 키
 */
export const HIRE_QUERY_KEY = {
  ALL: ['Hire'],
  PAGES: () => [...HIRE_QUERY_KEY.ALL, 'pages'],
  DETAILS: () => [...HIRE_QUERY_KEY.ALL, 'detail'],
  PAGE: (pagination: WithPaginationParams) => [
    ...HIRE_QUERY_KEY.PAGES(),
    pagination,
  ],
  DETAIL: (id: number) => [...HIRE_QUERY_KEY.DETAILS(), id],
} as const;
