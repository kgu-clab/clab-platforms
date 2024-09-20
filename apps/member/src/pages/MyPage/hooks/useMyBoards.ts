import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyBoards } from '@api/board';
import { BOARD_QUERY_KEY } from '@constants/key';

import type { WithPaginationParams } from '@type/api';

export interface UseMyBoardsOptions extends WithPaginationParams {}

/**
 * 본인이 작성한 게시글 목록을 가져옵니다.
 */
export function useMyBoards({ page = 0, size = 10 }: UseMyBoardsOptions = {}) {
  return useSuspenseQuery({
    queryFn: () => getMyBoards(page, size),
    queryKey: BOARD_QUERY_KEY.MY(),
  });
}
