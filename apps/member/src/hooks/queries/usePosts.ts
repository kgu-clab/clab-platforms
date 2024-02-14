import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getBoardsDetail } from '@api/board';
import { getNewsPost } from '@api/news';
import { getHirePost } from '@api/hire';
import type { NewsItem } from '@type/news';
import type { HireItem } from '@type/hire';
import type {
  CommunityCategoryType,
  CommunityPostDetailItem,
} from '@type/community';

type PostsType = CommunityPostDetailItem | NewsItem | HireItem;

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
    news: {
      queryKey: QUERY_KEY.NEWS,
      queryFn: () => getNewsPost(id),
    },
    hire: {
      queryKey: QUERY_KEY.HIRE,
      queryFn: () => getHirePost(id),
    },
  };

  const options = queryOptions[category];

  return useSuspenseQuery<PostsType, Error, PostsType, string[]>({
    queryKey: [options.queryKey, id],
    queryFn: options.queryFn,
  });
};
