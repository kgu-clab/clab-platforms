export const TABLE_HEAD = {
  ACTIVITY_GROUP_PARTICIPANTS: ['번호', '학번', '이름'] as const,
  ACTIVITY_GROUP_APPLIES: [
    '번호',
    '학번',
    '이름',
    '상태',
    '레벨',
    '관리',
    '기능',
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
  SUPPORT_HISTORY: ['번호', '상태', '구분', '요청자', '신청일'] as const,
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
  CALENDAR_SCHEDULE: [
    '번호',
    '제목',
    '시작일',
    '종료일',
    '중요도',
    '기능',
  ] as const,
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
} as const;
/**
 * 관리자 페이지에서 기능을 나타내는 상수
 */
export const TABLE_HEAD_ACTION = '기능';
