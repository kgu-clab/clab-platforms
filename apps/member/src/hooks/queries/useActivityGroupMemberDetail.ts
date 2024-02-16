import { getActivityDetail } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useActivityGroupMemberDetail = (
  activityGroupId: number,
  category: string,
) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY, activityGroupId, category],
    queryFn: () => getActivityDetail(activityGroupId, category),
  });
};
