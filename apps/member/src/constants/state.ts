export const BOOK_STATE = {
  WAIT: '대기',
  AVAILABLE: '대여가능',
  BORROWED: '대여중',
  RETURN: '반납완료',
} as const;

export const DATE_FORMAT = {
  WITH_TIME: 'YYYY-MM-DD',
} as const;
