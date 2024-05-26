import memberConfig from '../../member.config';

type Mode = 'development' | 'production';

/**
 * 현재 런타임 모드를 가져옵니다.
 */
export const MODE: Mode = import.meta.env.VITE_MODE;
/**
 * 개발 환경인지 확인합니다.
 */
export const IS_DEVELOPMENT = MODE === 'development';
/**
 * 데이터가 존재하지 않을 경우 서비스 이름으로 대체하기 위해 사용합니다.
 */
export const SERVICE_NAME = memberConfig.name;
/**
 * 채널톡 토큰을 가져옵니다.
 */
export const CHANNEL_TALK_TOKEN = import.meta.env.VITE_CHANNEL_TALK_TOKEN;
/**
 * 로그인 페이지 URL을 가져옵니다.
 * 환경에 따라 다른 URL을 사용합니다.
 */
export const LOGIN_URL = IS_DEVELOPMENT
  ? `${memberConfig.loginUrl}/dev` // 개발 환경에서는 dev 페이지로 이동합니다.
  : `${memberConfig.loginUrl}/play`; // 프로덕션 환경에서는 members 페이지로 이동합니다.
