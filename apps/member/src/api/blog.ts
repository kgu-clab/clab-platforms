import { PaginationType } from '@type/api';
import { server } from './server';
import { createPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import { BlogPostItem } from '@type/blog';

// 블로그 게시글 조회
export const getMyBlog = async (page: number, size: number) => {
  const { data } = await server.get<PaginationType<BlogPostItem>>({
    url: createPagination(END_POINT.MY_BLOG, page, size),
  });

  return data;
};
