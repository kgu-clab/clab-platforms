import { useSuspenseQuery } from '@tanstack/react-query';

import { getBoardsDetail } from '@api/board';
import { getHirePost } from '@api/hire';
import { getNewsPost } from '@api/news';
import {
  BOARD_QUERY_KEY,
  HIRE_QUERY_KEY,
  NEWS_QUERY_KEY,
  ORGANIZATION_QUERY_KEY,
} from '@constants/key';

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
 * 게시글 상세 조회를 합니다.
 */
export const useBoardDetail = (category: CommunityCategoryType, id: number) => {
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
      queryKey: ORGANIZATION_QUERY_KEY.DETAIL(id),
      queryFn: () => getBoardsDetail(id),
    },
    news: {
      queryKey: NEWS_QUERY_KEY.DETAIL(id),
      queryFn: () => getNewsPost(id),
    },
    hire: {
      queryKey: HIRE_QUERY_KEY.DETAIL(id),
      queryFn: () => getHirePost(id),
    },
  }[category];

  return useSuspenseQuery<PostsType>({
    queryKey: queryOptions.queryKey,
    queryFn: queryOptions.queryFn,
  });
};
