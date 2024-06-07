import { useSuspenseQuery } from '@tanstack/react-query';

import { getBoardsDetail } from '@api/board';
import { getHirePost } from '@api/hire';
import { getNewsPost } from '@api/news';
import { BOARD_QUERY_KEY, QUERY_KEY } from '@constants/key';

import type { BaseResponse } from '@type/api';
import type {
  CommunityCategoryType,
  CommunityHireBoard,
  CommunityNewsBoard,
  CommunityPostDetailItem,
} from '@type/community';

type PostsType = BaseResponse<
  CommunityPostDetailItem | CommunityNewsBoard | CommunityHireBoard
>;
/**
 * 카테고리에 따른 게시글을 가져옵니다.
 */
export const usePosts = (category: CommunityCategoryType, id: number) => {
  const queryOptions = {
    notice: {
      queryKey: BOARD_QUERY_KEY.DETAIL(id),
      queryFn: () => getBoardsDetail(id),
    },
    free: {
      queryKey: BOARD_QUERY_KEY.DETAIL(id),
      queryFn: () => getBoardsDetail(id),
    },
    qna: {
      queryKey: BOARD_QUERY_KEY.DETAIL(id),
      queryFn: () => getBoardsDetail(id),
    },
    graduated: {
      queryKey: BOARD_QUERY_KEY.DETAIL(id),
      queryFn: () => getBoardsDetail(id),
    },
    organization: {
      queryKey: QUERY_KEY.ORGANIZATION,
      queryFn: () => getBoardsDetail(id),
    },
    news: {
      queryKey: QUERY_KEY.NEWS,
      queryFn: () => getNewsPost(id),
    },
    hire: {
      queryKey: QUERY_KEY.HIRE,
      queryFn: () => getHirePost(id),
    },
  }[category];

  return useSuspenseQuery<PostsType>({
    queryFn: queryOptions.queryFn,
    queryKey: BOARD_QUERY_KEY.LIST(id),
  });
};
