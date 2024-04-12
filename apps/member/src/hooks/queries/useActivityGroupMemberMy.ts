import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityGroupMemberMy } from '@api/activity';
import { QUERY_KEY } from '@constants/key';

/**
 *  나의 활동 목록을 조회합니다.
 */
export const useActivityGroupMemberMy = (page = 0, size = 20) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY_GROUP_MY],
    queryFn: () => getActivityGroupMemberMy(page, size),
  });
};
