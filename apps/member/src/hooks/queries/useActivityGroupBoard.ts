import { getActivityBoard } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useActivityGroupBoard = (parentId: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY, parentId],
    queryFn: () => getActivityBoard(parentId),
  });
};
