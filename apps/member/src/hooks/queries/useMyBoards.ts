import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyBoards } from '@api/board';
import { BOARD_QUERY_KEY } from '@constants/key';

import { WithPaginationParams } from '@type/api';

/**
 * 본인이 작성한 게시글 목록을 가져옵니다.
 */
export const useMyBoards = ({
  page = 0,
  size = 10,
}: WithPaginationParams = {}) => {
  return useSuspenseQuery({
    queryKey: BOARD_QUERY_KEY.MY(),
    queryFn: () => getMyBoards(page, size),
  });
};
