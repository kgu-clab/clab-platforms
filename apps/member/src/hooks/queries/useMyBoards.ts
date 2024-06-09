import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyBoards } from '@api/board';
import { BOARD_QUERY_KEY } from '@constants/key';
import { getTime } from '@utils/date';

import { WithPaginationParams } from '@type/api';

/**
 * 본인이 작성한 게시글 목록을 가져옵니다.
 */
export const useMyBoards = ({
  page = 0,
  size = 10,
}: WithPaginationParams = {}) => {
  return useSuspenseQuery({
    queryFn: () => getMyBoards(page, size),
    queryKey: BOARD_QUERY_KEY.MY(),
    staleTime: getTime(0, 10, 0),
  });
};
