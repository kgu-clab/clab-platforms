import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';

import { BaseResponse, PaginationType } from '@type/api';
import type { HireItem } from '@type/hire';

import { server } from './server';

// 채용 공고 조회
export const getMyHire = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<HireItem>>({
    url: createCommonPagination(END_POINT.MY_HIRE, params),
  });

  return data;
};

// 채용 공고 상세 조회
export const getHirePost = async (id: string) => {
  const { data } = await server.get<BaseResponse<HireItem>>({
    url: END_POINT.HIRE(id),
  });

  return data;
};
