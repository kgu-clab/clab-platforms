import { getCommunityList } from '@api/community';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useCommunityList = (category: string, page = 0, size = 6) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.COMMUNITY, category, page, size],
    queryFn: () => getCommunityList(category, page, size),
  });
};
