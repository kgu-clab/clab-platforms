import { getBlogDetail } from '@api/blog';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
/**
 * 블로그 포스트 정보를 상세 조회합니다.
 */
export const useBlogDetail = (id: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.BLOG, id],
    queryFn: () => getBlogDetail(id),
  });
};
