/**
 * 날짜와 시간 관련된 유틸리티 함수를 모아둔 파일입니다.
 */

import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 로케이션 임포트

dayjs.locale('ko'); // 한국어로 설정

export const toYYMMDD = (date: string) => dayjs(date).format('YY.MM.DD');

/**
 * 주어진 날짜와 오늘 날짜의 차이를 일(day) 단위로 계산하여 반환합니다.
 *
 * @param {string} date - 비교할 날짜 (YYYY-MM-DD 형식)
 * @return {number} 오늘부터 주어진 날짜까지의 일수 차이, 절대값으로 반환됩니다.
 */
export const calculateDDay = (date: string): number =>
  Math.abs(dayjs(date).diff(dayjs(), 'day'));

/**
 * 주어진 날짜를 'YY.MM.DD(dd) HH:mm' 형식으로 포맷합니다.
 *
 * @param {Date|string|number} date - 포맷할 날짜. Date 객체, 문자열 또는 타임스탬프일 수 있습니다.
 * @returns {string} 포맷된 날짜 문자열.
 */
export const formattedDate = (date: string) =>
  dayjs(date).format('YY.MM.DD(dd) HH:mm');

/**
 * 주어진 초를 'mm:ss' 형식으로 포맷합니다.
 *
 * @param {number} seconds - 초 단위의 시간.
 * @returns {string} 포맷된 시간 문자열.
 */
export const formattedTime = (seconds: number) =>
  dayjs()
    .startOf('day')
    .add(seconds * 1000)
    .format('mm:ss');
