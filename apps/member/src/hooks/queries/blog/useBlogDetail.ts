import { useSuspenseQuery } from '@tanstack/react-query';

import { getBlogDetail } from '@api/blog';
import { BLOG_QUERY_KEY } from '@constants/key';

/**
 * 블로그 포스트 정보를 상세 조회합니다.
 */
export const useBlogDetail = (id: number) => {
  return useSuspenseQuery({
    queryKey: BLOG_QUERY_KEY.DETAIL(id),
    queryFn: () => getBlogDetail(id),
  });
};
