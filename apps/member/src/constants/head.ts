export const TABLE_HEAD = {
  ACTIVITY_GROUP_PARTICIPANTS: ['번호', '학번', '이름'],
  ACTIVITY_GROUP_APPLIES: ['번호', '학번', '이름', '상태', '기능'],
  SUPPORT_HISTORY: ['번호', '상태', '구분', '요청자', '신청일'],
  BOOK_LOAN_RECORD: ['대여자', '대여일', '반납 예정일', '상태'],
  COMMUNITY_DETAIL: ['번호', '제목', '작성자', '작성일'],
  BOOK_LOAN_RECORDS_OVERDUE: [
    '도서명',
    '대여자',
    '대여일',
    '반납 예정일',
    '연체일수',
  ],
} as const;
