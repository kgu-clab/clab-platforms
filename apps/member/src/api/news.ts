import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';

import { BaseResponse, PaginationType } from '@type/api';
import type { NewsItem } from '@type/news';

import { server } from './server';

// 뉴스 조회
export const getNews = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<NewsItem>>({
    url: createCommonPagination(END_POINT.MY_NEWS, params),
  });

  return data;
};

// 뉴스 상세 조회
export const getNewsPost = async (id: string) => {
  const { data } = await server.get<BaseResponse<NewsItem>>({
    url: END_POINT.NEWS(id),
  });

  return data;
};
