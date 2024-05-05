export const MODAL_TITLE = {
  ALARM: '🔔 알림',
  REPORT: '🚨 신고하기',
  DELETE: '🗑️ 삭제하기',
} as const;

export const MODAL_CONTENT = {
  REPORT:
    '신고가 누적되어 일정 수에 도달하면 운영진이 내용을 재검토합니다.\n정말 신고하시겠습니까?\n\n신고는 각 사용자당 한 번만 가능합니다. 중복은 인정되지 않습니다.',
  DELETE: '정말 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.',
} as const;

export const MODAL_ACCEPT = {
  REPORT: '신고할래요',
  DELETE: '삭제할래요',
} as const;
