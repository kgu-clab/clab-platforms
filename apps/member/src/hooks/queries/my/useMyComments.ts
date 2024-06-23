import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyComments } from '@api/comment';
import { MEMBER_QUERY_KEY } from '@constants/key';

import { WithPaginationParams } from '@type/api';

/**
 * 내가 작성한 댓글 목록을 가져옵니다.
 */
export function useMyComments({
  page = 0,
  size = 10,
}: WithPaginationParams = {}) {
  return useSuspenseQuery({
    queryKey: MEMBER_QUERY_KEY.COMMENTS(),
    queryFn: () => getMyComments(page, size),
  });
}
