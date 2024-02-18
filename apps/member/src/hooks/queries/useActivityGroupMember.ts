import { getActivityGroupMember } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useActivityGroupMember = (
  activityGroupId: number,
  page = 0,
  size = 20,
) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY, activityGroupId, page, size],
    queryFn: () => getActivityGroupMember(activityGroupId, page, size),
  });
};
