import { type ServiceCode } from '@utils/service';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // 프로덕션 환경
export const TEST_API_BASE_URL = process.env.NEXT_PUBLIC_TEST_API_BASE_URL; // 스테이징 환경

export function createURL(code: ServiceCode, url: string) {
  const baseURL = code === 'dev' ? TEST_API_BASE_URL : API_BASE_URL;
  return baseURL + url;
}

export const END_POINTS = {
  LOGIN: '/v1/login',
  TWO_FACTOR_LOGIN: '/v1/login/authenticator',
} as const;
