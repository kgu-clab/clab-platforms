import { getActivityGroupByStatus } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useActivityGroupMemberByStatus = (
  activityGroupStatus: string,
  page = 0,
  size = 20,
) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY, activityGroupStatus, page, size],
    queryFn: () => getActivityGroupByStatus(activityGroupStatus, page, size),
  });
};
