import memberConfig from '../../member.config';

type TEnvironmentMode = 'development' | 'production';
type TEnvironmentValue<T = string> = T | undefined;

/**
 * 현재 런타임 모드를 가져옵니다.
 */
export const ENVIRONMENT_MODE: TEnvironmentValue<TEnvironmentMode> = import.meta
  .env.MODE as TEnvironmentMode;

/**
 * 프로덕션 환경인지 확인합니다.
 */
export const IS_PRODUCTION = ENVIRONMENT_MODE === 'production';

/**
 * 개발 환경인지 확인합니다.
 */
export const IS_DEVELOPMENT = ENVIRONMENT_MODE === 'development';

/**
 * 서비스 이름을 가져옵니다.
 * 데이터가 존재하지 않을 경우 서비스 이름으로 대체하기 위해 사용합니다.
 */
export const SERVICE_NAME: TEnvironmentValue = memberConfig.name;

/**
 * 채널톡 토큰을 가져옵니다.
 */
export const CHANNEL_TALK_TOKEN: TEnvironmentValue = import.meta.env
  .VITE_CHANNEL_TALK_TOKEN;

/**
 * Sentry DSN을 가져옵니다.
 */
export const SENTRY_DSN: TEnvironmentValue = import.meta.env.VITE_SENTRY_DSN;

/**
 * 로그인 페이지 URL을 가져옵니다.
 * 환경에 따라 다른 URL을 사용합니다.
 */
export const LOGIN_URL = IS_DEVELOPMENT
  ? `${memberConfig.loginUrl}/dev` // 개발 환경에서는 dev 페이지로 이동합니다.
  : `${memberConfig.loginUrl}/play`; // 프로덕션 환경에서는 members 페이지로 이동합니다.

/**
 * unsplash 엑세스키를 가져옵니다.
 */
export const UNSPLASH_ACCESS_KEY: TEnvironmentValue = import.meta.env
  .VITE_UNSPLASH_ACCESS_KEY;
