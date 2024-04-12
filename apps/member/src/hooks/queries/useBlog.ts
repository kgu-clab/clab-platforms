import { useSuspenseQuery } from '@tanstack/react-query';

import { getBlog } from '@api/blog';
import { QUERY_KEY } from '@constants/key';

/**
 * 블로그 포스트 리스트를 조회합니다.
 */
export const useBlog = (page = 0, size = 6) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.BLOG, page],
    queryFn: () => getBlog(page, size),
  });
};
