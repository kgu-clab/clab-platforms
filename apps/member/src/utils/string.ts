import { ClassValue, clsx } from 'clsx';
import * as entities from 'entities';
import { twMerge } from 'tailwind-merge';

import type { MembershipStatusType } from '@type/membershipFee';
import type { SchedulePriority } from '@type/schedule';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * 주어진 숫자를 한국식 통화 형식으로 포맷합니다.
 * @param amount 포맷할 숫자
 * @returns 포맷된 숫자 문자열
 */
export function formatWon(amount: number): string {
  return amount.toLocaleString('ko-KR');
}
/**
 * 멤버십 상태를 텍스트로 변환하는 함수입니다.
 * @param status - 멤버십 상태 타입
 * @returns 멤버십 상태에 해당하는 텍스트
 * @throws 알 수 없는 멤버십 상태일 경우 에러를 throw합니다.
 */
export function toMembershipStatusText(status: MembershipStatusType): string {
  switch (status) {
    case 'APPROVED':
      return '승인';
    case 'PENDING':
      return '대기중';
    case 'REJECTED':
      return '반려';
    case 'HOLD':
      return '보류';
    default:
      throw new Error(`Unknown Membership status: ${status}`);
  }
}
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
 * 중요도를 텍스트로 변환하는 함수입니다.
 *
 * @param priority - 중요도 값 ('HIGH', 'MEDIUM', 'LOW')
 * @returns 중요도에 해당하는 텍스트
 * @throws 알 수 없는 중요도일 경우 에러를 throw합니다.
 */
export function toPriorityText(priority: SchedulePriority) {
  switch (priority) {
    case 'HIGH':
      return '높음';
    case 'MEDIUM':
      return '중간';
    case 'LOW':
      return '낮음';
    default:
      throw new Error(`Unknown priority: ${priority}`);
  }
}
