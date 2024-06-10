import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityGroupByStatus } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

import type { ActivityGroupStatusType } from '@type/activity';
import type { WithPaginationParams } from '@type/api';

interface UseActivityGroupMemberByStatusParams extends WithPaginationParams {
  status?: ActivityGroupStatusType;
}

/**
 *  활동그룹을 상태별 조회합니다.
 */
export function useActivityGroupMemberByStatus({
  status = 'PROGRESSING',
  page = 0,
  size = 20,
}: UseActivityGroupMemberByStatusParams = {}) {
  return useSuspenseQuery({
    queryKey: ACTIVITY_QUERY_KEY.STATUS(status),
    queryFn: () => getActivityGroupByStatus(status, page, size),
  });
}
