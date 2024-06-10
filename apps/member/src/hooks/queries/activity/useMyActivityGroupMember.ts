import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityGroupMemberMy } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

import type { WithPaginationParams } from '@type/api';

interface Params extends WithPaginationParams {}

/**
 *  나의 활동 목록을 조회합니다.
 */
export function useMyActivityGroupMember({ page = 0, size = 10 }: Params = {}) {
  return useSuspenseQuery({
    queryKey: ACTIVITY_QUERY_KEY.MY(),
    queryFn: () => getActivityGroupMemberMy(page, size),
  });
}
