import { BaseResponse, PaginationType } from '@type/api';
import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { NewsItem } from '@type/news';

// 뉴스 조회
export const getNews = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<NewsItem>>({
    url: createCommonPagination(END_POINT.MY_NEWS, params),
  });

  return data;
};

export const getNewsPost = async (id: number) => {
  const { data } = await server.get<BaseResponse<NewsItem>>({
    url: END_POINT.NEWS(id),
  });
  return data;
};
