import { useSuspenseQuery } from '@tanstack/react-query';

import { getComments } from '@api/comment';
import { COMMENT_QUERY_KEY } from '@constants/key';
import { getTime } from '@utils/date';

import { WithPaginationParams } from '@type/api';

interface UseComment extends WithPaginationParams {
  id: number;
}

/**
 * 게시글에 대한 댓글을 조회합니다.
 */
export const useComments = ({ id, page = 0, size = 100 }: UseComment) => {
  return useSuspenseQuery({
    queryKey: COMMENT_QUERY_KEY.DETAIL(id),
    queryFn: () => getComments(id, page, size),
    staleTime: getTime({ minutes: 2 }),
  });
};
