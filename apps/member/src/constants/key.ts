import type {
  ActivityGroupBoardCategoryType,
  ActivityGroupStatusType,
} from '@type/activity';
import type { WithPaginationParams } from '@type/api';
import type { CommunityCategoryType } from '@type/community';
import { RoleLevelKey } from '@type/member';

/**
 * 전역 상태 관리 키
 */
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
  PAGES: () => [...MEMBER_QUERY_KEY.ALL, 'pages'],
  PAGE: (pagination: WithPaginationParams, role?: RoleLevelKey) => [
    ...MEMBER_QUERY_KEY.PAGES(),
    pagination,
    role,
  ],
} as const;

/**
 * 알림 관련 쿼리 키
 */
export const NOTIFICATION_QUERY_KEY = {
  ALL: ['Notification'],
  MY: () => [...NOTIFICATION_QUERY_KEY.ALL, 'my'],
} as const;

/**
 * 일정 관련 쿼리 키
 */
export const SCHEDULE_QUERY_KEY = {
  ALL: ['Schedule'],
  MY: () => [...SCHEDULE_QUERY_KEY.ALL, 'my'],
  MONTHS: () => [...SCHEDULE_QUERY_KEY.ALL, 'months'],
  COLLECTS: () => [...SCHEDULE_QUERY_KEY.ALL, 'collects'],
  ACTIVITIES: () => [...SCHEDULE_QUERY_KEY.MY(), 'activities'],
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

interface BoardParams {
  id: number;
  category?: ActivityGroupBoardCategoryType;
  parent?: boolean;
}
export const ACTIVITY_QUERY_KEY = {
  ALL: ['Activity'],
  MY: () => [...ACTIVITY_QUERY_KEY.ALL, 'my'],
  MY_ASSIGNMENTS: () => [...ACTIVITY_QUERY_KEY.MY(), 'assignment'],
  PHOTOS: () => [...ACTIVITY_QUERY_KEY.ALL, 'photos'],
  DETAILS: () => [...ACTIVITY_QUERY_KEY.ALL, 'details'],
  STATUSES: () => [...ACTIVITY_QUERY_KEY.ALL, 'statuses'],
  APPLICATIONS: () => [...ACTIVITY_QUERY_KEY.ALL, 'applications'],
  BOARDS: () => [...ACTIVITY_QUERY_KEY.ALL, 'boards'],
  MEMBERS: () => [...ACTIVITY_QUERY_KEY.ALL, 'members'],
  MY_APPLIED: () => [...ACTIVITY_QUERY_KEY.MY(), 'applied'],
  MY_ASSIGNMENT: (id: number) => [...ACTIVITY_QUERY_KEY.MY_ASSIGNMENTS(), id],
  DETAIL: (id: number) => [...ACTIVITY_QUERY_KEY.DETAILS(), id],
  STATUS: (status: ActivityGroupStatusType) => [
    ...ACTIVITY_QUERY_KEY.STATUSES(),
    status,
  ],
  STATUSES_PAGES: (status: ActivityGroupStatusType) => [
    ...ACTIVITY_QUERY_KEY.STATUS(status),
    'pages',
  ],
  STATUS_PAGE: (
    status: ActivityGroupStatusType,
    pagination: WithPaginationParams,
  ) => [...ACTIVITY_QUERY_KEY.STATUSES_PAGES(status), pagination],
  APPLICATION: (id: number) => [...ACTIVITY_QUERY_KEY.APPLICATIONS(), id],
  APPLICATIONS_PAGES: (id: number) => [
    ...ACTIVITY_QUERY_KEY.APPLICATION(id),
    'pages',
  ],
  APPLICATIONS_PAGE: (id: number, pagination: WithPaginationParams) => [
    ...ACTIVITY_QUERY_KEY.APPLICATIONS_PAGES(id),
    pagination,
  ],
  BOARD: ({ id, category, parent = false }: BoardParams) => [
    ...ACTIVITY_QUERY_KEY.BOARDS(),
    id,
    category,
    parent ? 'parent' : undefined,
  ],
  MEMBER: (id: number) => [...ACTIVITY_QUERY_KEY.MEMBERS(), id],
} as const;

/**
 * 게시판 관련 쿼리 키
 */
export const BOARD_QUERY_KEY = {
  ALL: ['Board'],
  MY: () => [...BOARD_QUERY_KEY.ALL, 'my'],
  DETAILS: () => [...BOARD_QUERY_KEY.ALL, 'details'],
  COLLECTIONS: () => [...BOARD_QUERY_KEY.ALL, 'collections'],
  CATEGORIES: () => [...BOARD_QUERY_KEY.ALL, 'categories'],
  HASHTAGS: () => [...BOARD_QUERY_KEY.ALL, 'hashtags'],
  HOTS: () => [...BOARD_QUERY_KEY.ALL, 'hots'],
  CATEGORY: (category: CommunityCategoryType) => [
    ...BOARD_QUERY_KEY.CATEGORIES(),
    category,
  ],
  HASHTAG: (hashtags: Array<string>) => [
    ...BOARD_QUERY_KEY.HASHTAGS(),
    hashtags,
  ],
  HASHTAGS_PAGES: (hashtags: Array<string>) => [
    ...BOARD_QUERY_KEY.HASHTAG(hashtags),
    'hashtags',
  ],
  CATEGORY_PAGES: (category: CommunityCategoryType) => [
    ...BOARD_QUERY_KEY.CATEGORY(category),
    'pages',
  ],
  DETAIL: (id: number) => [...BOARD_QUERY_KEY.DETAILS(), id],
  COLLECTION: (pagination: WithPaginationParams) => [
    ...BOARD_QUERY_KEY.COLLECTIONS(),
    pagination,
  ],
  HASHTAG_PAGE: (hashtags: Array<string>, pagination: WithPaginationParams) => [
    ...BOARD_QUERY_KEY.HASHTAGS_PAGES(hashtags),
    pagination,
  ],
  CATEGORY_PAGE: (
    category: CommunityCategoryType,
    pagination: WithPaginationParams,
  ) => [...BOARD_QUERY_KEY.CATEGORY_PAGES(category), pagination],
  HOT: (strategyName?: string) => [...BOARD_QUERY_KEY.HOTS(), strategyName],
} as const;

/**
 * 댓글 관련 쿼리 키
 */
export const COMMENT_QUERY_KEY = {
  ALL: ['Comment'],
  DETAILS: () => [...COMMENT_QUERY_KEY.ALL, 'details'],
  DETAIL: (id: number) => [...COMMENT_QUERY_KEY.DETAILS(), id],
} as const;

/**
 * 해시태그 관련 쿼리 키
 */
export const HASHTAG_QUERY_KEY = {
  ALL: ['Hashtag'],
  LIST: () => [...HASHTAG_QUERY_KEY.ALL, 'list'],
} as const;

/**
 * 도서 관련 쿼리 키
 */
export const BOOK_QUERY_KEY = {
  ALL: ['Book'],
  PAGES: () => [...BOOK_QUERY_KEY.ALL, 'pages'],
  DETAILS: () => [...BOOK_QUERY_KEY.ALL, 'details'],
  PAGE: (pagination: WithPaginationParams) => [
    ...BOOK_QUERY_KEY.PAGES(),
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
  RECORDS_PAGE: () => [...BOOK_LOAN_RECORD_QUERY_KEY.ALL, 'records', 'pages'],
  OVERDUE_PAGE: () => [...BOOK_LOAN_RECORD_QUERY_KEY.ALL, 'overdue', 'pages'],
  BOOK: (bookId?: number) => [...BOOK_LOAN_RECORD_QUERY_KEY.BOOKS(), bookId],
  BORROWER: (borrowerId: string) => [
    ...BOOK_LOAN_RECORD_QUERY_KEY.BORROWERS(),
    borrowerId,
  ],
  OVERDUE: (pagination: WithPaginationParams) => [
    ...BOOK_LOAN_RECORD_QUERY_KEY.OVERDUE_PAGE(),
    pagination,
  ],
  RECORD: (pagination: WithPaginationParams) => [
    ...BOOK_LOAN_RECORD_QUERY_KEY.RECORDS_PAGE(),
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
  DETAILS: () => [...BLOG_QUERY_KEY.ALL, 'details'],
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
  DETAILS: () => [...NEWS_QUERY_KEY.ALL, 'details'],
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
  DETAILS: () => [...HIRE_QUERY_KEY.ALL, 'details'],
  PAGE: (pagination: WithPaginationParams) => [
    ...HIRE_QUERY_KEY.PAGES(),
    pagination,
  ],
  DETAIL: (id: number) => [...HIRE_QUERY_KEY.DETAILS(), id],
} as const;

/**
 * 동아리 소식 관련 쿼리 키
 */
export const ORGANIZATION_QUERY_KEY = {
  ALL: ['Organization'],
  PAGES: () => [...ORGANIZATION_QUERY_KEY.ALL, 'pages'],
  DETAILS: () => [...ORGANIZATION_QUERY_KEY.ALL, 'details'],
  PAGE: (pagination: WithPaginationParams) => [
    ...ORGANIZATION_QUERY_KEY.PAGES(),
    pagination,
  ],
  DETAIL: (id: number) => [...ORGANIZATION_QUERY_KEY.DETAILS(), id],
} as const;

/**
 * 지원 관련 쿼리 키
 */
export const APPLICATION_QUERY_KEY = {
  ALL: ['Application'],
  PAGES: () => [...APPLICATION_QUERY_KEY.ALL, 'pages'],
  RECRUITMENT_PAGE: (
    recruitmentId: number,
    pagination: WithPaginationParams,
  ) => [...APPLICATION_QUERY_KEY.PAGES(), recruitmentId, pagination],
} as const;

/**
 * 모집 공고 관련 쿼리 키
 */
export const RECRUITMENT_QUERY_KEY = {
  ALL: ['Application'],
  LIST: () => [...APPLICATION_QUERY_KEY.ALL, 'list'],
} as const;
