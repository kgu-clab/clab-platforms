import { getCommentList } from '@api/comment';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useCommentList = (id: number, page = 0, size = 20) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.COMMENTS, id, page, size],
    queryFn: () => getCommentList(id, page, size),
  });
};
