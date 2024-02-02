import { getMyComments } from '@api/comment';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useMyComments = (page = 0, size = 20) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MY_COMMENTS, page, size],
    queryFn: () => getMyComments(page, size),
  });
};
