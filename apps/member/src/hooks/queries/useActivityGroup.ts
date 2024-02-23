import { getActivityGroupDetail } from '@api/activity';

import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useActivityGroup = (id: string) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY, id],
    queryFn: () => getActivityGroupDetail(id),
  });
};
