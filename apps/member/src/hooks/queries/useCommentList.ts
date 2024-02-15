import { getCommentList } from '@api/comment';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useCommentList = (id: string, page = 0, size = 20) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.COMMENTS, id],
    queryFn: () => getCommentList(id, page, size),
  });
};
