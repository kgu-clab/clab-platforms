import { useSuspenseQuery } from '@tanstack/react-query';

import { getBoards } from '@api/board';
import { QUERY_KEY } from '@constants/key';

import type { PaginationPramsType } from '@type/api';

interface UseBoardsParams extends PaginationPramsType {}

/**
 * 커뮤니티 게시글 목록을 조회합니다.
 */
export const useBoards = ({ page = 0, size = 20 }: UseBoardsParams) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.BOARDS],
    queryFn: () => getBoards(page, size),
  });
};
