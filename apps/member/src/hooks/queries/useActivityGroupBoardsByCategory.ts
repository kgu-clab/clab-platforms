import { getActivityBoardsById } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useActivityGroupBoardsByCategory = (
  activityGroupId: number,
  category: string,
  page = 0,
  size = 20,
) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY, activityGroupId, category, page, size],
    queryFn: () => getActivityBoardsById(activityGroupId, category, page, size),
  });
};
