import { getTime } from '@utils/date';

/**
 * API Call Stale Time
 */
export const STALE_TIME = {
  /**
   * 최신의 데이터가 필요하지 않는 경우 사용합니다.
   * 사용자 이벤트에 영향이 없는 데이터
   */
  LONG: getTime({ hours: 1 }),
  /**
   * 데이터가 자주 변경되는 경우 사용합니다.
   * 사용자 이벤트에 영향이 없지만 최신 데이터가 필요한 경우
   */
  MEDIUM: getTime({ minutes: 30 }),
  /**
   * 최신의 데이터가 필요한 경우 사용합니다.
   * 사용자 이벤트에 영향이 있는 데이터
   */
  SHORT: getTime({ minutes: 1 }),
  /**
   * 항상 최신 데이터를 요청합니다.
   */
  ALWAYS: 0,
  /**
   * 데이터 요청 기본 시간
   */
  DEFAULT: getTime({ minutes: 3 }),
} as const;

/**
 * 북 대여 상태를 정의합니다.
 */
export const BOOK_STATE = {
  WAIT: '대기',
  AVAILABLE: '대여가능',
  BORROWED: '대여중',
  RETURN: '반납완료',
} as const;

/**
 * 시간 형식을 정의합니다.
 */
export const DATE_FORMAT = {
  WITH_TIME: 'YYYY-MM-DD',
} as const;

/**
 * 게시글 제목의 최대 길이
 * 100자
 */
export const BOARD_TITLE_MAX_LENGTH = 100;
/**
 * 게시글 내용의 최대 길이
 * 5000자
 */
export const BOARD_CONTENT_MAX_LENGTH = 5000;

/**
 * 활동 그룹 멤버 역할을 정의합니다.
 */
export const ACTIVITY_MEMBER_ROLE = {
  LEADER: 'LEADER',
  MEMBER: 'MEMBER',
  NONE: 'NONE',
} as const;

/**
 * 활동 그룹 멤버 상태를 정의합니다.
 */
export const ACTIVITY_MEMBER_STATE = {
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  WAITING: 'WAITING',
} as const;

/**
 * 활동 그룹 상태를 정의합니다.
 */
export const ACTIVITY_STATE = {
  WAITING: 'WAITING',
  PROGRESSING: 'PROGRESSING',
  END: 'END',
} as const;

/**
 * 게시판 카테고리를 정의합니다.
 */
export const ACTIVITY_BOARD_CATEGORY_STATE = {
  NOTICE: 'NOTICE',
  WEEKLY_ACTIVITY: 'WEEKLY_ACTIVITY',
  FEEDBACK: 'FEEDBACK',
  ASSIGNMENT: 'ASSIGNMENT',
  SUBMIT: 'SUBMIT',
} as const;
