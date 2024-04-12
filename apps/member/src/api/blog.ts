import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';

import { BaseResponse, PaginationType } from '@type/api';
import type { BlogPost } from '@type/blog';

import { server } from './server';

/**
 * 블로그 포스트 조회
 */
export const getBlog = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<BlogPost>>({
    url: createCommonPagination(END_POINT.BLOG, params),
  });

  return data;
};
/**
 * 블로그 포스트 상세 조회
 */
export const getBlogDetail = async (id: number) => {
  const { data } = await server.get<BaseResponse<BlogPost>>({
    url: END_POINT.BLOG_DETAIL(id),
  });

  return data;
};
