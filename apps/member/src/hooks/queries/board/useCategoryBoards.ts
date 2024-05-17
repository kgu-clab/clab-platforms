import { useSuspenseQuery } from '@tanstack/react-query';

import { getBoardsList } from '@api/board';
import { getMyHire } from '@api/hire';
import { getNews } from '@api/news';
import { QUERY_KEY } from '@constants/key';

import type { Pagination, WithPaginationParams } from '@type/api';
import type {
  CommunityCategoryType,
  CommunityHireBoard,
  CommunityNewsBoard,
  CommunityPostItem,
} from '@type/community';

interface UseCategoryBoardsParams extends WithPaginationParams {
  category: CommunityCategoryType;
}

type QueryOptions = {
  queryKey: string;
  queryFn: () => Promise<
    Pagination<CommunityPostItem | CommunityNewsBoard | CommunityHireBoard>
  >;
};

/**
 * 커뮤니티 게시글을 카테고리별로 조회합니다.
 */
export const useCategoryBoards = ({
  category,
  page = 0,
  size = 6,
}: UseCategoryBoardsParams) => {
  const queryOptions: QueryOptions = {
    notice: {
      queryKey: QUERY_KEY.BOARDS,
      queryFn: () => getBoardsList('notice', page, size),
    },
    free: {
      queryKey: QUERY_KEY.BOARDS,
      queryFn: () => getBoardsList('free', page, size),
    },
    qna: {
      queryKey: QUERY_KEY.BOARDS,
      queryFn: () => getBoardsList('qna', page, size),
    },
    graduated: {
      queryKey: QUERY_KEY.BOARDS,
      queryFn: () => getBoardsList('graduated', page, size),
    },
    organization: {
      queryKey: QUERY_KEY.ORGANIZATION,
      queryFn: () => getBoardsList('organization', page, size),
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
    queryKey: [queryOptions.queryKey, category, { page, size }],
    queryFn: queryOptions.queryFn,
  });
};
