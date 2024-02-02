import { PaginationType } from '@type/api';
import { server } from './server';
import { createPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { CommentItem } from '@type/comment';

// 나의 댓글 조회
export const getMyComments = async (page: number, size: number) => {
  const { data } = await server.get<PaginationType<CommentItem>>({
    url: createPagination(END_POINT.MY_COMMENTS, page, size),
  });

  return data;
};
