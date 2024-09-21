import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyComments } from '@api/comment';
import { MEMBER_QUERY_KEY } from '@constants/key';

import type { WithPaginationParams } from '@type/api';

export interface UseMyCommentsOptions extends WithPaginationParams {}

/**
 * 내가 작성한 댓글 목록을 가져옵니다.
 */
export function useMyComments({
  page = 0,
  size = 10,
}: UseMyCommentsOptions = {}) {
  return useSuspenseQuery({
    queryFn: () => getMyComments(page, size),
    queryKey: MEMBER_QUERY_KEY.COMMENTS(),
  });
}
