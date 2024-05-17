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
