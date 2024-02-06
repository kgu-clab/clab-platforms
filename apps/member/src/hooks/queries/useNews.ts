import { getNews } from '@api/news';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useNews = (page = 0, size = 4) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MY_NEWS, page, size],
    queryFn: () => getNews(page, size),
  });
};
