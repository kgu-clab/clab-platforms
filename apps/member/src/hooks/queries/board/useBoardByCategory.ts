import { useSuspenseQuery } from '@tanstack/react-query';

import { getBoardsList } from '@api/board';
import { getMyHire } from '@api/hire';
import { getNews } from '@api/news';
import { BOARD_QUERY_KEY } from '@constants/key';

import type { Pagination, WithPaginationParams } from '@type/api';
import type {
  CommunityCategoryType,
  CommunityHireBoard,
  CommunityNewsBoard,
  CommunityPostItem,
} from '@type/community';

interface Params extends WithPaginationParams {
  category: CommunityCategoryType;
}

type QueryOptions = {
  queryKey: string | string[];
  queryFn: () => Promise<
    Pagination<CommunityPostItem | CommunityNewsBoard | CommunityHireBoard>
  >;
};

/**
 * 커뮤니티 게시글을 카테고리별로 조회합니다.
 */
export function useBoardByCategory({ category, page = 0, size = 6 }: Params) {
  const queryOptions: QueryOptions = {
    notice: {
      queryKey: BOARD_QUERY_KEY.CATEGORY('notice'),
      queryFn: () => getBoardsList('notice', page, size),
    },
    free: {
      queryKey: BOARD_QUERY_KEY.CATEGORY('free'),
      queryFn: () => getBoardsList('free', page, size),
    },
    qna: {
      queryKey: BOARD_QUERY_KEY.CATEGORY('qna'),
      queryFn: () => getBoardsList('qna', page, size),
    },
    graduated: {
      queryKey: BOARD_QUERY_KEY.CATEGORY('graduated'),
      queryFn: () => getBoardsList('graduated', page, size),
    },
    organization: {
      queryKey: BOARD_QUERY_KEY.CATEGORY('organization'),
      queryFn: () => getBoardsList('organization', page, size),
    },
    news: {
      queryKey: BOARD_QUERY_KEY.CATEGORY('news'),
      queryFn: () => getNews(page, size),
    },
    hire: {
      queryKey: BOARD_QUERY_KEY.CATEGORY('hire'),
      queryFn: () => getMyHire(page, size),
    },
  }[category];

  return useSuspenseQuery({
    queryKey: [...queryOptions.queryKey, { page, size }],
    queryFn: queryOptions.queryFn,
  });
}
