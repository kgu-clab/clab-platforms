import { END_POINT } from '@constants/api';

import type { AccusesType } from '@type/accuses';
import { BaseResponse } from '@type/api';

import { server } from './server';

// 신고하기
export const postAccuses = async (body: AccusesType) => {
  const { data } = await server.post<AccusesType, BaseResponse<number>>({
    url: END_POINT.ACCUSES,
    body,
  });

  return data;
};
