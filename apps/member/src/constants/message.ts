export const ERROR_MESSAGE = {
  DEFAULT: '오류가 발생했어요. 잠시후에 다시 시도해주세요.',
  NETWORK: '네트워크 오류가 발생했어요. 잠시후에 다시 시도해주세요.',
  NOT_FOUND: '잘못된 접근이에요.',
  NO_FILE: '파일이 없어요.',
  NO_DATA: '모든 항목을 입력해주세요.',
} as const;

export const COMMUNITY_MESSAGE = {
  NO_ARTICLE: '작성된 게시글이 없어요.',
} as const;

export const GROUP_MESSAGE = {
  NO_ACTIVITY: '해당 활동을 찾을 수 없어요.',
  NO_FEEDBACK: '작성된 피드백이 없어요.',
  NO_PERMISSION: '해당 활동에 접근 권한이 없어요.',
  NO_WEEKLY_ACTIVITY: '현재 생성된 주차별 활동이 없어요.',
  NO_WAITING_ACTIVITY: '생성 신청된 활동 그룹이 없어요.',
  NO_END_ACTIVITY: '종료된 활동 그룹이 없어요.',
  NO_PROGRESSING_ACTIVITY: '진행중인 활동 그룹이 없어요.',
  NO_PARTICIPANT: '활동 멤버가 없어요.',
} as const;

export const LIBRARY_MESSAGE = {
  NO_BOOK: '해당 도서를 찾아봤지만 없는 것 같아요.',
} as const;

export const MY_MESSAGE = {
  NO_HISTORY: '내역이 없어요.',
  NO_MEMBERSHIP: '회비 신청 내역이 없어요.',
  NO_ACTIVITY: '활동 내역이 없어요.',
} as const;
/**
 * 에러 발생에 대한 사용자에게 안내할 메세지를 정의합니다.
 * Server 팀과 협의하여 정의합니다.
 */
export const API_ERROR_MESSAGE = {
  BOOKALREADYAPPLIEDFORLOANEXCEPTION: '이미 대여 신청한 도서이에요.',
  ALREADYBORROWEDBOOKEXCEPTION: '해당 도서는 대여 상태에요.',
  OVERDUEEXCEPTION: '도서 대여 연장은 최대 2회까지 가능해요.',
  NOTFOUNDEXCEPTION: '요청하신 정보를 찾을 수 없어요.',
  ALREADYAPPLIEDEXCEPTION: '이미 신청한 활동이에요.',
} as const;
