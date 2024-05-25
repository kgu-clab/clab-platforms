import type { Token } from '@type/server';

export type ServiceCode = 'play' | 'members' | 'dev';

export interface ServiceMap {
  url: string;
  name: string;
}

const SERVICE_MAP: Record<ServiceCode, ServiceMap> = {
  dev: { url: 'http://localhost:6002/auth', name: '개발환경' },
  play: { url: 'https://play.clab.page/auth', name: '플레이' },
  members: { url: 'https://members.clab.page/auth', name: '멤버스' },
} as const;
/**
 * 연결되는 서비스의 정보를 가져옵니다.
 * 백엔드의 로그인 시스템이 개발되기 전까지 임시로 사용합니다.
 */
export function SERVICE(code: ServiceCode | null) {
  if (!code) return null;
  return { code, ...SERVICE_MAP[code] };
}
/**
 * 토큰을 포함한 리다이렉션 주소를 맵핑합니다.
 */
export function REDIRECT_WITH_TOKEN(code: ServiceCode, token: Token) {
  const { url } = SERVICE(code) ?? {};
  return `${url}/?a=${token.access}&r=${token.refresh}`;
}
