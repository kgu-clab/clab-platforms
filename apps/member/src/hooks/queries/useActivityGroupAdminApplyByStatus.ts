import { getActivityGroupApplyByStatus } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useActivityGroupAdminApplyByStatus = (
  activityGroupId: number,
  status: string,
  page = 0,
  size = 20,
) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY, activityGroupId, status, page, size],
    queryFn: () =>
      getActivityGroupApplyByStatus(activityGroupId, status, page, size),
  });
};
