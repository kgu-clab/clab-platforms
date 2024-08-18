import { END_POINT } from '@constants/api';

import { BaseResponse } from '@type/api';
import { RecruitmentType } from '@type/recruitment';

import { server } from './server';

/**
 * 최신 모집 공고 5개 조회
 */
export async function getRecruitment() {
  const { data } = await server.get<BaseResponse<RecruitmentType[]>>({
    url: END_POINT.RECRUITMENT,
  });

  return data;
}
