import { PaginationType } from '@type/api';
import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { BlogPostItem } from '@type/blog';

// 블로그 게시글 조회
export const getMyBlog = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<BlogPostItem>>({
    url: createCommonPagination(END_POINT.MY_BLOG, params),
  });

  return data;
};
