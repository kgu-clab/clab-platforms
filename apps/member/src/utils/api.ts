import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  SERVER_BASE_URL,
} from '@constants/api';

/**
 * 여러 개의 경로를 안전하게 연결하여 전체 경로를 생성합니다.
 * @param {...Array<string | number>} path - 연결할 경로 조각들입니다.
 * @returns {string} - 생성된 전체 경로 문자열입니다.
 */
export function createPath(...path: Array<string | number>): string {
  return path
    .map((path, index) => {
      const pathStr = path.toString();
      const prefix = index > 0 && !pathStr.startsWith('?') ? '/' : '';
      return prefix + pathStr;
    })
    .join('')
    .replace(/([^:])\/\/+/g, '$1/');
}

/**
 * API 엔드포인트에 공통적인 페이징을 적용한 URL을 생성합니다.
 * @param {string} endpoint - 기본이 되는 API 엔드포인트 주소입니다.
 * @param {Record<string, string | number | boolean | undefined | null>} params - URL에 포함될 쿼리 파라미터들입니다.
 * @returns {string} - 페이징이 적용된 전체 URL 문자열입니다.
 */
export function createCommonPagination(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined | null>,
): string {
  let url = `${endpoint}?`;
  Object.keys(params).forEach((key, index) => {
    const value = params[key];
    if (value === null || value === undefined) return;
    if (index !== 0) {
      url += '&';
    }
    url += `${key}=${encodeURIComponent(value)}`;
  });
  return url;
}

/**
 * 세션 스토리지에서 접근 토큰을 가져옵니다.
 * @returns {string | null} - 저장된 접근 토큰이 있으면 해당 문자열을, 없으면 null을 반환합니다.
 */
export function getAccessToken(): string | null {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * 세션 스토리지에서 갱신 토큰을 가져옵니다.
 * @returns {string | null} - 저장된 갱신 토큰이 있으면 해당 문자열을, 없으면 null을 반환합니다.
 */
export function getRefreshToken(): string | null {
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * 세션 스토리지에 접근 토큰과 갱신 토큰을 저장합니다.
 * @param {string} accessToken - 저장할 접근 토큰입니다.
 * @param {string} refreshToken - 저장할 갱신 토큰입니다.
 */
export function setTokens(accessToken: string, refreshToken: string) {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

/**
 * 세션 스토리지에서 접근 토큰과 갱신 토큰을 제거합니다.
 */
export function removeTokens() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * 인증에 사용될 헤더 객체를 생성합니다.
 * @param {string | null} token - 사용할 토큰입니다. 토큰이 없다면 null을 전달합니다.
 * @returns {Record<string, string>} - Authorization 헤더를 포함한 객체입니다.
 */
export function authorization(token: string | null) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

/**
 * 문자열이 base64 형식인지 확인합니다.
 * @param {string} url - 확인할 문자열입니다.
 * @returns {boolean} - 문자열이 base64 형식이면 true, 아니면 false를 반환합니다.
 */
export function isBase64(url: string): boolean {
  return /;base64,/.test(url);
}

/**
 * 이미지 URL을 생성합니다. 문자열이 base64 형식이라면 그대로 반환하고, 아니라면 서버의 기본 URL과 경로를 조합합니다.
 * @param {string} imageUrl - 변환할 이미지 URL입니다.
 * @returns {string} - 조건에 따라 변환된 최종 이미지 URL입니다.
 */
export function createImageUrl(imageUrl: string): string {
  if (isBase64(imageUrl)) return imageUrl;
  return imageUrl.startsWith(SERVER_BASE_URL)
    ? imageUrl
    : createPath(SERVER_BASE_URL, imageUrl);
}
