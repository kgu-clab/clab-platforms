export const API_BASE_URL = 'https://api.clab.page/api';

export const END_POINTS = {
  LOGIN: '/v1/login',
  TWO_FACTOR_LOGIN: '/v1/login/authenticator',
} as const;

export const SUCCESS_MESSAGE = {
  AUTH: '인증에 성공했습니다.',
} as const;

export const ERROR_MESSAGE = {
  AUTH: '인증에 실패했습니다.',
  SERVER: '로그인에 실패했습니다. 입력 정보를 다시 확인해주세요.',
} as const;

// OAuth 백엔드가 개발 전까지 임시로 사용합니다
export const REDIRECT = (code: string) => {
  return (
    {
      play: 'https://play.clab.page/auth',
      dev: 'http://localhost:6002/auth',
    }[code] || 'https://clab.page'
  );
};
