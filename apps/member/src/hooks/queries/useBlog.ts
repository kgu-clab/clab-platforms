import { useSuspenseQuery } from '@tanstack/react-query';

import { getBlog } from '@api/blog';
import { BLOG_QUERY_KEY } from '@constants/key';

import type { WithPaginationParams } from '@type/api';

/**
 * 블로그 리스트를 조회합니다.
 */
export function useBlog({ page = 0, size = 6 }: WithPaginationParams = {}) {
  return useSuspenseQuery({
    queryKey: BLOG_QUERY_KEY.PAGE({ page, size }),
    queryFn: () => getBlog(page, size),
  });
}
