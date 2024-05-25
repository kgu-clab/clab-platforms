import type { Token, XClabAuth } from '@type/server';

type AuthHeaderResult = {
  secretKey: string | null;
  token: Token;
};

/**
 * 주어진 헤더를 파싱하여 인증 헤더 정보를 반환합니다.
 */
export function parserAuthHeader(header: string | null) {
  const result: AuthHeaderResult = {
    secretKey: null,
    token: {
      access: '',
      refresh: '',
    },
  };

  if (!header) return result;

  const parsedAuthHeader = JSON.parse(header) as XClabAuth;

  result.secretKey =
    'secretKey' in parsedAuthHeader ? parsedAuthHeader.secretKey : null;
  result.token = {
    access:
      'accessToken' in parsedAuthHeader
        ? (parsedAuthHeader.accessToken as string)
        : '',
    refresh:
      'refreshToken' in parsedAuthHeader
        ? (parsedAuthHeader.refreshToken as string)
        : '',
  };

  return result;
}
