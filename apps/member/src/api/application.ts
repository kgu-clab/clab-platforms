import { createPagination, createURL } from '@clab-platforms/utils';

import { END_POINT } from '@constants/api';

import {
  BaseResponse,
  ResponsePagination,
  WithPaginationParams,
} from '@type/api';
import type { ApplicationMemberType } from '@type/application';

import { server } from './server';

export interface GetApplicationConditionsParams extends WithPaginationParams {
  recruitmentId?: number;
}
export interface PatchApplicationPassParams {
  recruitmentId: number;
  studentId: string;
}
export interface PatchApplicationNonePassParams {
  recruitmentId: number;
  studentId: string;
}
export interface PostApplicationMemberParams {
  recruitmentId: number;
  studentId: string;
}

/**
 * 지원자 페이지네이션 조회
 */
export async function getApplicationConditions({
  recruitmentId,
  page,
  size,
}: GetApplicationConditionsParams) {
  const { data } = await server.get<ResponsePagination<ApplicationMemberType>>({
    url: createPagination(END_POINT.APPLICATION_CONDITION, {
      recruitmentId,
      page,
      size,
    }),
  });

  return data;
}

/**
 * 지원자 합격 상태로 변경
 */
export async function patchApplicationPass({
  recruitmentId,
  studentId,
}: PatchApplicationPassParams) {
  const { data } = await server.patch<never, BaseResponse<number>>({
    url: createURL(END_POINT.APPLICATION_APPROVE(recruitmentId, studentId)),
  });

  return data;
}

/**
 * 지원자 불합격 싱테로 변경
 */
export async function patchApplicationNonePass({
  recruitmentId,
  studentId,
}: PatchApplicationNonePassParams) {
  const { data } = await server.patch<never, BaseResponse<number>>({
    url: createURL(END_POINT.APPLICATION_REJECT(recruitmentId, studentId)),
  });

  return data;
}

/**
 * 합격자 멤버 개별 생성
 */
export async function postApplicationMember({
  recruitmentId,
  studentId,
}: PostApplicationMemberParams) {
  const { data } = await server.post<never, BaseResponse<string>>({
    url: createURL(END_POINT.APPLICATION_MEMBER(recruitmentId, studentId)),
  });

  return data;
}

/**
 * 모집 내 존재하는 합격자 멤버 통합 생성
 */
export async function postApplicationAllMember(recruitmentId: number) {
  const { data } = await server.post<never, BaseResponse<string[]>>({
    url: createURL(END_POINT.APPLICATION_MEMBERS(recruitmentId)),
  });

  return data;
}
