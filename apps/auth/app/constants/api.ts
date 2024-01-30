export const END_POINTS = {
  LOGIN: '/login',
  TWO_FACTOR_LOGIN: '/login/authenticator',
} as const;

export const SUCCESS_MESSAGE = {
  AUTH: '인증에 성공했습니다.',
} as const;

export const ERROR_MESSAGE = {
  AUTH: '인증에 실패했습니다.',
  SERVER: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
} as const;

// OAuth 백엔드가 개발 전까지 임시로 사용합니다
export const REDIRECT = (code: string) => {
  return (
    {
      'clab.page': 'https://clab.page/login',
      dev: 'http://localhost:6002/login',
    }[code] || 'https://clab.page'
  );
};
