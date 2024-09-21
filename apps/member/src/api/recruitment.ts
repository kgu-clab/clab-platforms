import { END_POINT } from '@constants/api';

import { BaseResponse } from '@type/api';
import type { ApplicationType } from '@type/application';

import { server } from './server';

export interface Recruitment {
  id: number;
  startDate: string;
  endDate: string;
  applicationType: ApplicationType;
  target: string;
  status: string;
  updatedAt: string;
}

/**
 * 최신 모집 공고 5개 조회
 */
export async function getRecruitment() {
  const { data } = await server.get<BaseResponse<Recruitment[]>>({
    url: END_POINT.RECRUITMENT,
  });

  return data;
}
