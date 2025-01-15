import { useSuspenseQuery } from '@tanstack/react-query';

import { getBoardsList } from '@api/board';
import { getMyHire } from '@api/hire';
import { getNews } from '@api/news';
import { BOARD_QUERY_KEY } from '@constants/key';
import { STALE_TIME } from '@constants/state';

import type {
  Pagination,
  WithPaginationParams,
  WithPermissionParams,
} from '@type/api';
import type {
  CommunityCategoryType,
  CommunityHireBoard,
  CommunityNewsBoard,
  CommunityPostItem,
} from '@type/community';

interface Params extends WithPaginationParams, WithPermissionParams {
  category: CommunityCategoryType;
}

type queryFn = () => Promise<
  Pagination<CommunityPostItem | CommunityNewsBoard | CommunityHireBoard>
>;

/**
 * 커뮤니티 게시글을 카테고리별로 조회합니다.
 */
export function useBoardByCategory({
  category,
  page = 0,
  size = 6,
  hasPermission,
}: Params) {
  const queryFn: queryFn = {
    notice: () => getBoardsList('notice', page, size),
    free: () => getBoardsList('free', page, size),
    development_qna: () => getBoardsList('development_qna', page, size),
    information_reviews: () => getBoardsList('information_reviews', page, size),
    organization: () => getBoardsList('organization', page, size),
    news: () => getNews(page, size),
    hire: () => getMyHire(page, size),
  }[category];

  return useSuspenseQuery({
    queryKey: BOARD_QUERY_KEY.CATEGORY_PAGE(category, { page, size }),
    queryFn: queryFn,
    staleTime: hasPermission ? STALE_TIME.ALWAYS : STALE_TIME.SHORT,
  });
}
