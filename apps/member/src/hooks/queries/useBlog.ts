import { getMyBlog } from '@api/blog';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useBlog = (page = 0, size = 6) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MY_BLOG, page, size],
    queryFn: () => getMyBlog(page, size),
  });
};
