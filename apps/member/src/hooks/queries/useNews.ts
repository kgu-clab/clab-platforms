import { useSuspenseQuery } from '@tanstack/react-query';

import { getNews } from '@api/news';
import { NEWS_QUERY_KEY } from '@constants/key';
import { STALE_TIME } from '@constants/state';

import type { WithPaginationParams } from '@type/api';

export function useNews({ page = 0, size = 6 }: WithPaginationParams = {}) {
  return useSuspenseQuery({
    queryKey: NEWS_QUERY_KEY.PAGE({ page, size }),
    queryFn: () => getNews(page, size),
    staleTime: STALE_TIME.LONG,
  });
}
