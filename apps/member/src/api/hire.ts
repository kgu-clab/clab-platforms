import { BaseResponse, PaginationType } from '@type/api';
import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { HireItem } from '@type/hire';

// 채용 공고 조회
export const getMyHire = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<HireItem>>({
    url: createCommonPagination(END_POINT.MY_HIRE, params),
  });

  return data;
};

// 채용 공고 상세 조회
export const getHirePost = async (id: number) => {
  const { data } = await server.get<BaseResponse<HireItem>>({
    url: END_POINT.HIRE(id),
  });

  return data;
};
