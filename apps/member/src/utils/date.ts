import type { ScheduleItem } from '@type/schedule';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

/**
 * 오늘 날짜를 dayjs 객체로 반환합니다.
 *
 * @returns {dayjs.Dayjs} dayjs 객체로 반환합니다.
 */
export const now = (): dayjs.Dayjs => dayjs();

/**
 * 주어진 날짜 문자열을 'YY.MM.DD' 형식으로 변환합니다.
 * `dayjs` 라이브러리의 `format` 메서드를 사용하여 날짜 형식을 지정합니다.
 * 예를 들어, '2024-02-15'를 입력받으면 '24.02.15'로 변환하여 반환합니다.
 *
 * @param date 날짜를 나타내는 문자열입니다. 'YYYY-MM-DD', 'YYYY/MM/DD' 등의 형식이 가능합니다.
 * @returns 변환된 날짜 문자열을 'YY.MM.DD' 형식으로 반환합니다.
 */
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
export const formattedDate = (date: string): string =>
  dayjs(date).format('YY.MM.DD(dd) HH:mm');

/**
 * 주어진 초를 'mm:ss' 형식으로 포맷합니다.
 *
 * @param {number} seconds - 초 단위의 시간.
 * @returns {string} 포맷된 시간 문자열.
 */
export const formattedTime = (seconds: number): string =>
  dayjs()
    .startOf('day')
    .add(seconds * 1000)
    .format('mm:ss');

/**
 * 주어진 이벤트 배열을 받아서, 각 이벤트의 시작 날짜를 기준으로 객체로 변환합니다.
 * 변환된 객체의 키는 이벤트의 `startDate`에서 추출한 날짜이며, 값은 해당 이벤트 객체입니다.
 *
 * @param {ScheduleItem[]} events - 변환할 이벤트 객체 배열. 각 이벤트는 `ScheduleItem` 인터페이스를 따릅니다.
 * @returns {Record<string, ScheduleItem>} - 키가 이벤트의 시작 날짜이고 값이 이벤트 객체인 객체.
 */
export const transformEvents = (
  events: ScheduleItem[],
): Record<string, ScheduleItem> => {
  return events.reduce(
    (acc, current) => {
      const dateKey = current.startDate.split('T')[0];
      acc[dateKey] = current;
      return acc;
    },
    {} as Record<string, ScheduleItem>,
  );
};

/**
 * 주어진 날짜의 년도와 학기를 반환합니다.
 *
 * @param {string} createdAt - 주어진 날짜.
 * @return {string} 주어진 날짜를 YY년도 1/2학기로 반환.
 */
export const getDateSemester = (createdAt: string): string => {
  const year = dayjs(createdAt).format('YY');
  const semester = dayjs(createdAt).get('month') <= 5 ? 1 : 2;
  return `${year}년도 ${semester}학기`;
};
