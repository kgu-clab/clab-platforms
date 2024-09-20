import { SERVICE_NAME } from '@constants/environment';
import { SELECT_ACTIVITY_GROUP_CATEGORY_TYPE } from '@constants/select';
import { ACTIVITY_MEMBER_ROLE, ACTIVITY_MEMBER_STATE } from '@constants/state';

import {
  ActivityGroupCategoryType,
  ActivityMemberRoleType,
  MemberStatusType,
} from '@type/activity';
import type { ApplicationType } from '@type/application';
import type { Bookstore, BookstoreKorean } from '@type/book';
import type { CareerLevel, EmploymentType } from '@type/community';
import type { RoleLevelKey, RoleLevelType } from '@type/member';
import type { MembershipStatusType } from '@type/membershipFee';
import type { SchedulePriority } from '@type/schedule';

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

/**
 * BookStoreKorean 값을 BookStore 값(영문)으로 변환합니다.
 * @param value 변환할 BookStore 값입니다.
 * @returns 변환된 BookStore 값을 반환합니다.
 * @throws {Error} 알 수 없는 BookStore 값일 경우 에러를 throw합니다.
 */
export function toBookstore(value: BookstoreKorean): Bookstore {
  switch (value) {
    case '교보문고':
      return 'kyobobook';
    case '예스24':
      return 'yes24';
    case '알라딘':
      return 'aladin';
    default:
      throw new Error(`Unknown BookStore value: ${value}`);
  }
}

/**
 * 주어진 리뷰 정보를 파싱하여 온라인 서점 별로 링크를 생성합니다.
 * @param links 링크 배열
 * @returns 온라인 서점 별로 링크를 생성한 객체
 */
export function bookReviewParser(links: string[]) {
  const bookstoreMap: Record<string, string | undefined> = {
    kyobobook: undefined,
    yes24: undefined,
    aladin: undefined,
  };

  for (const link of links) {
    if (link.includes('kyobobook')) {
      bookstoreMap.kyobobook = link;
    } else if (link.includes('yes24')) {
      bookstoreMap.yes24 = link;
    } else if (link.includes('aladin')) {
      bookstoreMap.aladin = link;
    }
  }

  return bookstoreMap;
}

/**
 * 멤버 이름을 출력합니다.
 * @param name 이름
 * @param id 학번
 * @returns 양식대로 변경된 멤버 이름, 이름이 없을 경우 서비스 이름을 반환합니다.
 */
export function formatMemberName(name?: string | null, id?: string | null) {
  if (!name) return SERVICE_NAME;
  const studentId = id?.slice(2, 4);
  return id ? `${name} (${studentId})` : name;
}

export function toKoreaCareerLevel(careerLevel: CareerLevel) {
  switch (careerLevel) {
    case 'FRESHMAN':
      return '신입';
    case 'EXPERIENCED':
      return '경력';
    case 'NOT_SPECIFIED':
      return '무관';
    default:
      return '-';
  }
}

export function toKoreaEmploymentType(employmentType: EmploymentType | null) {
  switch (employmentType) {
    case 'FULL_TIME':
      return '정규직';
    case 'CONTRACT':
      return '계약직';
    case 'INTERN':
      return '인턴';
    case 'ASSISTANT':
      return '어시스턴트';
    case 'PART_TIME':
      return '파트타임';
    default:
      return '-';
  }
}

export function toKoreaMemberLevel(
  memberLevel: RoleLevelKey | RoleLevelType | null,
) {
  switch (memberLevel) {
    case 'USER':
    case 1:
      return '일반';
    case 'ADMIN':
    case 2:
      return '운영진';
    case 'SUPER':
    case 3:
      return '관리자';
    default:
      return '-';
  }
}

export function toKoreanApplicationType(type: ApplicationType) {
  switch (type) {
    case 'NORMAL':
      return '회원';
    case 'OPERATION':
      return '운영진';
    case 'CORE_TEAM':
      return '코어팀';
    default:
      return '알수없음';
  }
}

export const createQueryParams = (name: string, page: number | string) => {
  return `?${name}=${page}`;
};

export function toKoreaActivityGroupMemberLevel(
  memberLevel: ActivityMemberRoleType | null,
) {
  switch (memberLevel) {
    case ACTIVITY_MEMBER_ROLE.MEMBER:
      return '멤버';
    case ACTIVITY_MEMBER_ROLE.LEADER:
      return '리더';
    default:
      return '-';
  }
}

export function toKoreaActivityGroupCategory(
  activityGroupCategory: ActivityGroupCategoryType | null,
) {
  switch (activityGroupCategory) {
    case SELECT_ACTIVITY_GROUP_CATEGORY_TYPE.STUDY:
      return '스터디';
    case SELECT_ACTIVITY_GROUP_CATEGORY_TYPE.PROJECT:
      return '프로젝트';
    default:
      return '-';
  }
}

export function toKoreaActivityGroupMemberStatus(
  status: MemberStatusType,
): string {
  switch (status) {
    case ACTIVITY_MEMBER_STATE.ACCEPTED:
      return '승인';
    case ACTIVITY_MEMBER_STATE.REJECTED:
      return '거절';
    case ACTIVITY_MEMBER_STATE.WAITING:
      return '대기';
    default:
      return '-';
  }
}
