export const TABLE_HEAD = {
  ACTIVITY_GROUP_PARTICIPANTS: ['번호', '학번', '이름'] as const,
  ACTIVITY_GROUP_APPLIES: [
    '번호',
    '학번',
    '이름',
    '상태',
    '역할',
    '관리',
    '역할 변경',
  ] as const,
  ACTIVITY_GROUP_DETAIL: ['번호', '이름', '대상', '리더', '기능'] as const,
  ACTIVITY_GROUP_ASSIGNMENT: [
    '학번',
    '이름',
    '제출 일시',
    '파일명',
    '기능',
  ] as const,
  ACTIVITY_GROUP_BOARD: ['번호', '제목', '작성일', '기능'] as const,
  BOOK_LOAN_RECORD: ['대여자', '대여일', '반납 예정일', '상태'] as const,
  COMMUNITY_DETAIL: ['번호', '제목', '작성자', '작성일'] as const,
  BOOK_LOAN_RECORDS_OVERDUE: [
    '도서명',
    '대여자',
    '대여일',
    '반납 예정일',
    '연체일수',
    '기능',
  ] as const,
  BOOK_LIST: ['카테고리', '도서명', '작가', '상태', '기능'] as const,
  CALENDAR_TABLE: ['날짜', '일정'] as const,
  APPLY_TABLE: [
    '번호',
    '이름',
    '학번',
    '지원서',
    '상태',
    '합불 처리',
    '생성',
  ] as const,
  MEMBER_MANAGE_TABLE: ['번호', '학번', '이름', '상태'],
  INQUIRY_TABLE: ['번호', '제목', '문의자', '문의일', '카테고리 / 상태'],
} as const;
/**
 * 관리자 페이지에서 기능을 나타내는 상수
 */
export const TABLE_HEAD_ACTION = '기능';
