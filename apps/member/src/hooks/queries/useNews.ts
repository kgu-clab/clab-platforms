import { useSuspenseQuery } from '@tanstack/react-query';

import { getNews } from '@api/news';
import { QUERY_KEY } from '@constants/key';

export const useNews = (page = 0, size = 6) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.NEWS, page, size],
    queryFn: () => getNews(page, size),
  });
};
