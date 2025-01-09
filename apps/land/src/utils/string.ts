import { APPLICATION_TYPE } from '@/constants';
import { ApplicationType } from '@/types';
import dayjs from 'dayjs';

/**
 * 주어진 날짜를 한국 시간대로 변환합니다.
 */
export function toKoreaISOString(date: string | undefined | null): string {
  if (!date) return '-';
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
}

/**
 * 주어진 날짜의 형식을 변환합니다.
 */
export function formattedDate(date: string | undefined | null): string {
  if (!date) return '-';
  return dayjs(date).format('YYYY.MM.DD HH:mm');
}

/**
 * 지원 타입을 한국어로 변환합니다.
 */
export function toKoreanApplicationType(type: ApplicationType) {
  return APPLICATION_TYPE[type];
}

/**
 * 현재 날짜가 주어진 기간 내에 속하는지 확인합니다.
 */
export function isProgressing(startDate: string, endDate: string) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const now = dayjs();

  return now.isAfter(start) && now.isBefore(end);
}

/**
 * 전화번호에 -을 생성합니다.
 */
export const formattedPhoneInput = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  let formatted = cleaned;

  if (cleaned.length > 3 && cleaned.length <= 7) {
    formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else if (cleaned.length > 7) {
    formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  }

  return formatted;
};
