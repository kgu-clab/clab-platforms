import { getMyHire } from '@api/hire';
import { getNews } from '@api/news';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getBoardsList } from '@api/board';
import { PaginationPramsType } from '@type/api';
import type { CommunityCategoryType } from '@type/community';

interface UseBoardsListParams extends PaginationPramsType {
  category: CommunityCategoryType;
}

/**
 * 커뮤니티 게시글를 카테고리별로 조회합니다.
 */
export const useBoardsList = ({
  category,
  page = 0,
  size = 6,
}: UseBoardsListParams) => {
  const queryOptions = {
    notice: {
      queryKey: QUERY_KEY.BORDER_NOTICE,
      queryFn: () => getBoardsList('notice', page, size),
    },
    free: {
      queryKey: QUERY_KEY.BORDER_FREE,
      queryFn: () => getBoardsList('free', page, size),
    },
    qna: {
      queryKey: QUERY_KEY.BORDER_QNA,
      queryFn: () => getBoardsList('qna', page, size),
    },
    graduated: {
      queryKey: QUERY_KEY.BORDER_GRADUATED,
      queryFn: () => getBoardsList('graduated', page, size),
    },
    news: {
      queryKey: QUERY_KEY.NEWS,
      queryFn: () => getNews(page, size),
    },
    hire: {
      queryKey: QUERY_KEY.HIRE,
      queryFn: () => getMyHire(page, size),
    },
  }[category];

  return useSuspenseQuery({
    queryKey: [queryOptions.queryKey, category, page],
    queryFn: queryOptions.queryFn,
  });
};
