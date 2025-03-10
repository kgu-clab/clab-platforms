export const TABLE_TITLES = {
  WISH_LIST: '소망가방',
  LECTURE_LIST: '개설강좌',
  REGISTRATION_LIST: '수강신청',
} as const;

export const TABLE_HEADERS = {
  WISH_LIST: [
    'No',
    '신청',
    '일괄처리',
    '구분',
    '조직구분',
    '개설전공',
    '과목번호',
    '학수코드',
    '과목명',
    '학년',
    '학점',
    '담당교수',
    '교시',
    '변경사항',
    '재수강',
    '비고',
    '공학인증',
  ],
  LECTURE_LIST: [''], // 이 부분은 아직 개발하지 않은 교양, 전공, 연계, 외국어과목 탭에서 과목 리스트를 검색할 때 결과 화면에 사용되는 헤더입니다.
  REGISTRATION_LIST: [
    'No',
    '삭제',
    '캠퍼스',
    '과목번호',
    '과목명',
    '교시',
    '이수구분',
    '학점',
    '담당교수',
    '재수강',
    '비고',
    '공학인증',
    '대기순위',
  ],
} as const;
