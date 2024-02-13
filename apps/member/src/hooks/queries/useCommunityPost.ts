import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCommunityPost } from '../../api/community';

export const useCommunityPost = (id = 'error') => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.COMMUNITY, id],
    queryFn: () => getCommunityPost(id),
  });
};
