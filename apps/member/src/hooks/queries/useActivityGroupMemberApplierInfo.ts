import { getActivityApplierInfo } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useActivityGroupMemberApplierInfo = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY],
    queryFn: () => getActivityApplierInfo(),
  });
};
