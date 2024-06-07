import { WithPaginationParams } from '@type/api';
import type { CommunityCategoryType } from '@type/community';

export const ATOM_KEY = {
  IS_LOGGED_IN: 'isLoggedInState',
  MODAL: 'modalState',
  TOAST: 'toastState',
} as const;

export const QUERY_KEY = {
  MY_PROFILE: 'MyProfile',
  MY_BOARDS: 'MyBoards',
  MY_NOTIFICATIONS: 'MyNotifications',
  MY_COMMENTS: 'MyComments',
  MY_ACTIVITY: 'MyActivity',
  MEMBERS: 'Members',
  ORGANIZATION: 'Organization',
  NEWS: 'News',
  BLOG: 'Blog',
  HIRE: 'Hire',
  BIRTHDAY: 'Birthday',
  SCHEDULE: 'Schedule',
  SCHEDULE_COLLECT: 'ScheduleCollect',
  MAIN_ACTIVITY_PHOTO: 'MainActivityPhoto',
  COMMENTS: 'Comments',
  MEMBERSHIP_FEE: 'MembershipFee',
  UPLOADEDFILE: 'UploadedFile',
  SHARED_ACCOUNT: 'SharedAccount',
  SHARED_ACCOUNT_USAGE: 'SharedAccountUsage',
  ACTIVITY: 'Activity',
  ACTIVITY_BOARDS: 'ActivityBoards',
  ACTIVITY_GROUP_MY: 'ActivityGroupMy',
  ACTIVITY_GROUP_APPLY: 'ActivityGroupApply',
  ACTIVITY_BOARDS_MY_ASSIGNMENT: 'ActivityBoardsMyAssignment',
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
 * 게시판 관련 쿼리 키
 */
export const BOARD_QUERY_KEY = {
  ALL: ['Board'],
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
