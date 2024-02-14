import { getMyHire } from '@api/hire';
import { getNews } from '@api/news';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { categoryToTitle } from '@utils/community';
import type { CommunityCategoryType } from '@type/community';
import { getBoardsList } from '@api/board';

export const useBoards = (
  category: CommunityCategoryType,
  page = 0,
  size = 6,
) => {
  const queryOptions = {
    notice: {
      queryKey: QUERY_KEY.BORDER_NOTICE,
      queryFn: () => getBoardsList(categoryToTitle('notice'), page, size),
    },
    free: {
      queryKey: QUERY_KEY.BORDER_FREE,
      queryFn: () => getBoardsList(categoryToTitle('free'), page, size),
    },
    qna: {
      queryKey: QUERY_KEY.BORDER_QNA,
      queryFn: () => getBoardsList(categoryToTitle('qna'), page, size),
    },
    graduated: {
      queryKey: QUERY_KEY.BORDER_GRADUATED,
      queryFn: () => getBoardsList(categoryToTitle('graduated'), page, size),
    },
    news: {
      queryKey: QUERY_KEY.NEWS,
      queryFn: () => getNews(page, size),
    },
    hire: {
      queryKey: QUERY_KEY.HIRE,
      queryFn: () => getMyHire(page, size),
    },
  };

  const options = queryOptions[category];

  return useSuspenseQuery({
    queryKey: [options.queryKey, category, page, size],
    queryFn: options.queryFn,
  });
};
