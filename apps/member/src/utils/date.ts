import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import type { ScheduleItem } from '@type/schedule';

dayjs.locale('ko');
/**
 * 오늘 날짜를 dayjs 객체로 반환합니다.
 *
 * @returns {dayjs.Dayjs} dayjs 객체로 반환합니다.
 */
export function now(): dayjs.Dayjs {
  return dayjs();
}
/**
 * 주어진 날짜 문자열을 'YY.MM.DD' 형식으로 변환합니다.
 * `dayjs` 라이브러리의 `format` 메서드를 사용하여 날짜 형식을 지정합니다.
 * 예를 들어, '2024-02-15'를 입력받으면 '24.02.15'로 변환하여 반환합니다.
 *
 * @param date 날짜를 나타내는 문자열입니다. 'YYYY-MM-DD', 'YYYY/MM/DD' 등의 형식이 가능합니다.
 * @returns 변환된 날짜 문자열을 'YY.MM.DD' 형식으로 반환합니다.
 */
export function toYYMMDD(date: string) {
  return dayjs(date).format('YY.MM.DD');
}
/**
 * 주어진 날짜와 오늘 날짜의 차이를 일(day) 단위로 계산하여 반환합니다.
 *
 * @param {string} date - 비교할 날짜 (YYYY-MM-DD 형식)
 * @return {number} 오늘부터 주어진 날짜까지의 일수 차이, 절대값으로 반환됩니다.
 */
export function calculateDDay(date: string): number {
  return Math.abs(
    dayjs(date).startOf('day').diff(dayjs().startOf('day'), 'day'),
  );
}
/**
 * 주어진 날짜를 'YY.MM.DD(dd) HH:mm' 형식으로 포맷합니다.
 *
 * @param {string | undefined | null} date - 포맷할 날짜. Date 객체, 문자열 또는 타임스탬프일 수 있습니다.
 * @returns {string} 포맷된 날짜 문자열.
 */
export function formattedDate(date: string | undefined | null): string {
  if (!date) return '-';
  return dayjs(date).format('YY.MM.DD(dd) HH:mm');
}
/**
 * 주어진 시작일과 종료일을 형식화된 날짜 기간 문자열로 반환합니다.
 * 시작일과 종료일이 동일한 경우 시작일의 형식화된 날짜를 반환합니다.
 * 시작일과 종료일이 다른 경우 시작일과 종료일을 형식화된 날짜로 연결한 문자열을 반환합니다.
 * @param startDate 시작일을 나타내는 문자열
 * @param endDate 종료일을 나타내는 문자열
 * @returns 형식화된 날짜 기간 문자열
 */
export function formattedDatePeriod(startDate: string, endDate: string) {
  return startDate === endDate
    ? formattedDate(startDate)
    : `${formattedDate(startDate)} ~ ${formattedDate(endDate)}`;
}

/**
 * 주어진 초를 'mm:ss' 형식으로 포맷합니다.
 *
 * @param {number} seconds - 초 단위의 시간.
 * @returns {string} 포맷된 시간 문자열.
 */
export function formattedTime(seconds: number): string {
  return dayjs()
    .startOf('day')
    .add(seconds * 1000)
    .format('mm:ss');
}
/**
 * 주어진 이벤트 배열을 받아서, 각 이벤트의 시작 날짜를 기준으로 객체로 변환합니다.
 * 변환된 객체의 키는 이벤트의 `startDate`에서 추출한 날짜이며, 값은 해당 이벤트 객체입니다.
 *
 * @param {ScheduleItem[]} events - 변환할 이벤트 객체 배열. 각 이벤트는 `ScheduleItem` 인터페이스를 따릅니다.
 * @returns {Record<string, ScheduleItem[]>} - 키가 이벤트의 시작 날짜이고 값이 이벤트 객체인 객체.
 */
export const transformEvents = (
  events: ScheduleItem[],
): Record<string, ScheduleItem[]> => {
  return events.reduce(
    (acc, current) => {
      const startDate = new Date(current.startDateTime.split('T')[0]); // 시작 날짜 객체 생성
      const endDate = new Date(current.endDateTime.split('T')[0]); // 종료 날짜 객체 생성

      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const dateKey = date.toISOString().split('T')[0];

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }

        acc[dateKey].push(current);
      }

      return acc;
    },
    {} as Record<string, ScheduleItem[]>,
  );
};
/**
 * 가장 가까운 이벤트를 찾습니다.
 *
 * @param events - 일정 항목 배열 (transformEvents 함수로 변환된 객체)
 * @returns 가장 가까운 이벤트 항목
 */
export function findClosestEvent(
  events: Record<string, ScheduleItem[]>,
): ScheduleItem | null {
  const today = dayjs();
  let closestEvent: ScheduleItem | null = null;
  let smallestDiff = Number.MAX_SAFE_INTEGER;

  Object.entries(events).forEach(([date, eventArray]) => {
    const eventDate = dayjs(date);
    const diff = eventDate.diff(today, 'day');

    if (diff >= 0 && diff < smallestDiff) {
      smallestDiff = diff;
      closestEvent = eventArray[0];
    }
  });

  return closestEvent;
}
/**
 * 주어진 날짜의 년도와 학기를 반환합니다.
 *
 * @param {string} createdAt - 주어진 날짜.
 * @return {string} 주어진 날짜를 YY년도 1/2학기로 반환.
 */
export function getDateSemester(createdAt: string): string {
  const year = dayjs(createdAt).format('YY');
  const semester = dayjs(createdAt).get('month') <= 5 ? 1 : 2;
  return `${year}년도 ${semester}학기`;
}
/**
 * 주어진 참조 날짜와 확인하고자 하는 날짜를 비교하여 유효성을 평가합니다.
 *
 * @param {string | undefined} checkDateStr - 유효성을 확인하고자 하는 날짜를 나타내는 문자열입니다. 'YYYY-MM-DD' 형식이어야 합니다.
 * @param {string | undefined} referenceDateStr - 유효성 판단의 기준이 되는 날짜를 나타내는 문자열입니다. 'YYYY-MM-DD' 형식이어야 합니다.
 * @returns {boolean} 확인하고자 하는 날짜가 참조 날짜 이전이거나 같으면 true, 그렇지 않으면 false를 반환합니다.
 */
export function isDateValid(
  checkDateStr: string | undefined,
  referenceDateStr: string | undefined,
): boolean {
  const checkDate = dayjs(checkDateStr);
  const referenceDate = dayjs(referenceDateStr);
  return checkDate.isBefore(referenceDate) || checkDate.isSame(referenceDate);
}
/**
 * 시작 날짜와 종료 날짜 사이의 맞춤 시간 기간 내 진행 상황을 백분율로 계산합니다.
 *
 * @param {string} startDate - 시작 날짜.
 * @param {string} endDate - 종료 날짜.
 * @returns {number} 지정된 기간 내 진행 상황을 나타내는 백분율 (0-100).
 */
export function checkExtendProgress(
  startDate: string,
  endDate: string,
): number {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const totalDays = end.diff(start, 'day'); // 총 기간 (일 단위)
  const elapsedDays = now().diff(start, 'day'); // 시작부터 지금까지의 일수

  // 시작 날짜가 종료 날짜 이후인 경우 진행률을 0으로 설정
  if (elapsedDays < 0) return 0;
  // 현재 날짜가 종료 날짜를 넘은 경우 진행률을 100으로 설정
  if (now().isAfter(end)) return 100;

  // 진행률 계산
  const progressPercentage = (elapsedDays / totalDays) * 100;
  return Math.min(progressPercentage, 100); // 100을 초과하지 않도록 처리
}
/**
 * 기본 14일 유예 기간을 포함한 지정된 마감 날짜까지 남은 일 수를 계산합니다.
 *
 * @param {string} borrowedAt - 책을 빌린 날짜.
 * @param {string} dueDate - 반납 예정 날짜.
 * @returns {number} 남은 일 수. 마감 날짜가 지났으면 음수 값이 반환됩니다.
 */
export function checkDueDate(borrowedAt: string, dueDate: string): number {
  const startDate = dayjs(borrowedAt);
  const endDate = dayjs(dueDate);
  return endDate.diff(startDate, 'd');
}
/**
 * 주어진 날짜를 한국 시간대로 변환하여 ISO 문자열로 반환합니다.
 *
 * @param {string | undefined | null} date 변환할 날짜 문자열
 * @returns 한국 시간대로 변환된 ISO 문자열
 */
export function toKoreaISOString(date: string | undefined | null): string {
  if (!date) return '-';
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
}
/**
 * 주어진 시간, 분, 초를 밀리초로 변환하는 함수입니다.
 * @param hours 시간 (기본값: 0)
 * @param minutes 분 (기본값: 0)
 * @param seconds 초 (기본값: 0)
 * @returns 변환된 밀리초 값
 */
export function getTime({ hours = 0, minutes = 0, seconds = 0 }): number {
  return ((hours * 60 + minutes) * 60 + seconds) * 1000;
}
