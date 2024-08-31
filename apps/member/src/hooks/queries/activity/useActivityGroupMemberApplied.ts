import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityGroupMemberApplied } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

/**
 * 내가 지원한 활동 목록을 조회합니다.
 */
export function useActivityGroupMemberApplied(page = 0, size = 99) {
  return useSuspenseQuery({
    queryKey: ACTIVITY_QUERY_KEY.MY_APPLIED(),
    queryFn: () => getActivityGroupMemberApplied(page, size),
  });
}
