export const SUCCESS_MESSAGE = {
  LOGIN: '로그인에 성공했어요',
  TWO_FACTOR_LOGIN: '2차 인증에 성공했어요',
} as const;

export const ERROR_MESSAGE = {
  SERVER: '로그인에 실패했어요\n잠시 후 다시 시도해 주세요.',
  LOGIN: '로그인에 실패했어요\n입력 정보를 확인하시고 다시 시도해 주세요.',
  TWO_FACTOR_LOGIN:
    '2차 인증에 실패했어요\n입력 정보를 확인하시고 다시 시도해 주세요.',
} as const;
