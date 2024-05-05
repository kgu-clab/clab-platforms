import { useSuspenseQuery } from '@tanstack/react-query';

import { getBoardsDetail } from '@api/board';
import { getHirePost } from '@api/hire';
import { getNewsPost } from '@api/news';
import { QUERY_KEY } from '@constants/key';

import type { BaseResponse } from '@type/api';
import type {
  CommunityCategoryType,
  CommunityPostDetailItem,
} from '@type/community';
import type { HireItem } from '@type/hire';
import type { NewsItem } from '@type/news';

type PostsType = BaseResponse<CommunityPostDetailItem | NewsItem | HireItem>;
/**
 * 카테고리에 따른 게시글을 가져옵니다.
 */
export const usePosts = (category: CommunityCategoryType, id: string) => {
  const queryOptions = {
    notice: {
      queryKey: QUERY_KEY.BORDER_NOTICE,
      queryFn: () => getBoardsDetail(id),
    },
    free: {
      queryKey: QUERY_KEY.BORDER_FREE,
      queryFn: () => getBoardsDetail(id),
    },
    qna: {
      queryKey: QUERY_KEY.BORDER_QNA,
      queryFn: () => getBoardsDetail(id),
    },
    graduated: {
      queryKey: QUERY_KEY.BORDER_GRADUATED,
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
    queryKey: [queryOptions.queryKey, category, id],
    queryFn: queryOptions.queryFn,
  });
};
