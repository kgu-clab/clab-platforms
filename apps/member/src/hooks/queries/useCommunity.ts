import { getMyCommunity } from '@api/community';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useCommunity = (page = 0, size = 6, category: string) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.COMMUNITY, page, size, category],
    queryFn: () => getMyCommunity(page, size, category),
  });
};
