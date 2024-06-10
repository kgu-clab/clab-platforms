import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityGroupMemberMy } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

/**
 *  나의 활동 목록을 조회합니다.
 */
export function useActivityGroupMemberMy(page = 0, size = 20) {
  return useSuspenseQuery({
    queryKey: [...ACTIVITY_QUERY_KEY.MY(), 'list'],
    queryFn: () => getActivityGroupMemberMy(page, size),
  });
}
