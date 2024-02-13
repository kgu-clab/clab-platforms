import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getHirePost } from '@api/hire';

export const useHirePost = (id: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.HIRE, id],
    queryFn: () => getHirePost(id),
  });
};
