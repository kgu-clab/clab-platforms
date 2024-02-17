import { getActivityBoardLayer } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useActivityGroupBoardsByParent = (
  parentId: number,
  page = 0,
  size = 20,
) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY, parentId, page, size],
    queryFn: () => getActivityBoardLayer(parentId, page, size),
  });
};
