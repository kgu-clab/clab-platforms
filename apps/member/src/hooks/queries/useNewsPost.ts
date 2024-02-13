import { getNewsPost } from '@api/news';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useNewsPost = (id: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.NEWS, id],
    queryFn: () => getNewsPost(id),
  });
};
