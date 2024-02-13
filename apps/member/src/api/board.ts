import { PaginationType } from '@type/api';
import { server } from './server';
import { END_POINT } from '@constants/api';
import type { BoardItem } from '@type/board';
import { createCommonPagination } from '@utils/api';

// 내가 작성한 커뮤니티 게시글 조회
export const getMyBoards = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<BoardItem>>({
    url: createCommonPagination(END_POINT.MY_BOARDS, params),
  });

  return data;
};
