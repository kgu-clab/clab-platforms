import { END_POINT } from '@constants/api';

import { BaseResponse } from '@type/api';
import type { Recruitment } from '@type/application';

import { server } from './server';

export interface RecruitmentList
  extends Omit<
    Recruitment,
    'processTimeline' | 'teamIntroduction' | 'jobDescription'
  > {
  id: number;
  status: string;
  updatedAt: string;
}

/**
 * 최신 모집 공고 5개 조회
 */
export async function getRecruitment() {
  const { data } = await server.get<BaseResponse<Array<RecruitmentList>>>({
    url: END_POINT.RECRUITMENT,
  });

  return data;
}

/**
 * 모집 공고 등록
 */
export async function postRecruitmentCreate(body: Recruitment) {
  return server.post<Recruitment, BaseResponse<number>>({
    url: END_POINT.RECRUITMENT,
    body,
  });
}
