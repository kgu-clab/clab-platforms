import memberConfig from '../../member.config.json';

type Mode = 'development' | 'production';
/**
 * 현재 런타임 모드를 가져옵니다.
 */
export const MODE: Mode = import.meta.env.VITE_MODE;
/**
 * 데이터가 존재하지 않을 경우 서비스 이름으로 대체하기 위해 사용합니다.
 */
export const SERVICE_NAME = memberConfig.name;
