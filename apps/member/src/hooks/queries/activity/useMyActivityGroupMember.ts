import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityGroupMemberMy } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

import type { ActivityGroupStatusType } from '@type/activity';
import type { WithPaginationParams } from '@type/api';

/**
 *  나의 활동 목록을 조회합니다.
 */

interface UseMyActivityGroupMemberParams extends WithPaginationParams {
  status?: ActivityGroupStatusType;
}

export function useMyActivityGroupMember({
  status,
  page = 0,
  size = 99,
}: UseMyActivityGroupMemberParams = {}) {
  return useSuspenseQuery({
    queryKey: ACTIVITY_QUERY_KEY.MY(),
    queryFn: () => getActivityGroupMemberMy({ status, page, size }),
  });
}
