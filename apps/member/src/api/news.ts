import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';

import { BaseResponse, ResponsePagination } from '@type/api';
import type { CommunityNewsBoard } from '@type/community';

import { server } from './server';

// 뉴스 조회
export const getNews = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<ResponsePagination<CommunityNewsBoard>>({
    url: createCommonPagination(END_POINT.MY_NEWS, params),
  });

  return data;
};

// 뉴스 상세 조회
export const getNewsPost = (id: number) => {
  return server.get<BaseResponse<CommunityNewsBoard>>({
    url: END_POINT.NEWS(id),
  });
};
