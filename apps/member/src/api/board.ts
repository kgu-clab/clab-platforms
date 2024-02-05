import { PaginationType } from '@type/api';
import { server } from './server';
import { END_POINT } from '@constants/api';
import type { BoardItem } from '@type/board';
import { createPagination } from '@utils/api';

// 내가 작성한 커뮤니티 게시글 조회
export const getMyBoards = async (page: number, size: number) => {
  const { data } = await server.get<PaginationType<BoardItem>>({
    url: createPagination(END_POINT.MY_BOARDS, page, size),
  });

  return data;
};
