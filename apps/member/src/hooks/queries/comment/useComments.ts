import { useSuspenseQuery } from '@tanstack/react-query';

import { getComments } from '@api/comment';
import { QUERY_KEY } from '@constants/key';

/**
 * 게시글에 대한 댓글을 조회합니다.
 */
export const useComments = (id: number, page = 0, size = 100) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.COMMENTS, id],
    queryFn: () => getComments(id, page, size),
  });
};
