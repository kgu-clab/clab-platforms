import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';

import type { BaseResponse, ResponsePagination } from '@type/api';
import type { CommunityHireBoard } from '@type/community';

import { server } from './server';

// 채용 공고 조회
export const getMyHire = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<ResponsePagination<CommunityHireBoard>>({
    url: createCommonPagination(END_POINT.MY_HIRE, params),
  });

  return data;
};

// 채용 공고 상세 조회
export const getHirePost = (id: number) => {
  return server.get<BaseResponse<CommunityHireBoard>>({
    url: END_POINT.HIRE(id),
  });
};
