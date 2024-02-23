import { getActivityGroupMember } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useActivityGroupMember = (id: string, page = 0, size = 20) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY, id, page, size],
    queryFn: () => getActivityGroupMember(id, page, size),
  });
};
