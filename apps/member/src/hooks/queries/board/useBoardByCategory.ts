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

type queryFn = () => Promise<
  Pagination<CommunityPostItem | CommunityNewsBoard | CommunityHireBoard>
>;

/**
 * 커뮤니티 게시글을 카테고리별로 조회합니다.
 */
export function useBoardByCategory({ category, page = 0, size = 6 }: Params) {
  const queryFn: queryFn = {
    notice: () => getBoardsList('notice', page, size),
    free: () => getBoardsList('free', page, size),
    qna: () => getBoardsList('qna', page, size),
    graduated: () => getBoardsList('graduated', page, size),
    organization: () => getBoardsList('organization', page, size),
    news: () => getNews(page, size),
    hire: () => getMyHire(page, size),
  }[category];

  return useSuspenseQuery({
    queryKey: BOARD_QUERY_KEY.CATEGORY_PAGE(category, { page, size }),
    queryFn: queryFn,
  });
}
