import { ClassValue, clsx } from 'clsx';
import * as entities from 'entities';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * 여러 개의 경로를 안전하게 연결하여 전체 경로를 생성합니다.
 * @param {...Array<string | number>} path - 연결할 경로들입니다.
 * @returns {string} - 연결된 전체 경로 문자열입니다.
 */
export function createURL(...path: Array<string | number | undefined>): string {
  return path
    .map((path, index) => {
      if (path === undefined) return;
      const pathStr = path.toString();
      const prefix = index > 0 && !pathStr.startsWith('?') ? '/' : '';
      return prefix + pathStr;
    })
    .join('')
    .replace(/([^:])\/\/+/g, '$1/');
}

/**
 * 여러 개의 경로와 쿼리스트링을 연결하여 전체 경로을 생성합니다.
 * @param {...Array<string | number>} path - 연결할 경로들입니다.
 * @param params 쿼리스트링에 넣을 객체
 * @returns 쿼리스트링이 붙은 경로
 */
export function createURLWithQueryString(
  path: Array<string | number | undefined>,
  params: Record<string, string | number>,
): string {
  return `${createURL(...path)}${toQueryString(params)}`;
}

/**
 * API 엔드포인트에 공통적인 페이징을 적용한 URL을 생성합니다.
 * @param {string} endpoint - 기본이 되는 API 엔드포인트 주소입니다.
 * @param {Record<string, T>} params - URL에 포함될 쿼리 파라미터들입니다.
 * @returns {string} - 페이징이 적용된 전체 URL 문자열입니다.
 */
export function createPagination<T>(
  endpoint: string,
  params: Record<string, T>,
): string {
  const queryString = Object.entries(params)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${key}=${encodeURIComponent(value as string | number | boolean)}`,
    )
    .join('&');

  return `${endpoint}?${queryString}`;
}

/**
 * 주어진 숫자를 한국식 통화 형식으로 포맷합니다.
 * @param amount 포맷할 숫자
 * @returns 포맷된 숫자 문자열
 */
export function formatWon(amount: number): string {
  return amount.toLocaleString('ko-KR');
}

/**
 * 천 단위로 쉼표를 추가하여 숫자를 형식화합니다.
 *
 * @param value 형식화할 숫자입니다.
 * @returns 쉼표가 추가된 형식화된 숫자입니다.
 */
export const formatComma = (value: number | string): string => {
  if (!value) {
    return '';
  }
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 주어진 문자열에서 HTML 엔티티를 디코딩합니다.
 *
 * @param string 디코딩할 문자열
 * @returns 디코딩된 문자열
 */
export function toDecodeHTMLEntities(string?: string) {
  if (!string) return '';
  return entities.decodeHTML(string);
}

/**
 * 객체를 쿼리스트링으로 바꿔줍니다.
 */
function toQueryString(params: Record<string, string | number>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
