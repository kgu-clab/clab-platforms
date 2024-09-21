import { END_POINT } from '@constants/api';

import { BaseResponse } from '@type/api';

import { server } from './server';

export interface Accuses {
  targetType: string;
  targetId: number;
  reason: string;
}

// 신고하기
export const postAccuses = async (body: Accuses) => {
  const { data } = await server.post<Accuses, BaseResponse<number>>({
    url: END_POINT.ACCUSES,
    body,
  });

  return data;
};
