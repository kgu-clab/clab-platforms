import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityGroupByStatus } from '@api/activity';
import { QUERY_KEY } from '@constants/key';

import type { ActivityGroupStatusType } from '@type/activity';

/**
 *  활동그룹을 상태별 조회합니다.
 * @param status
 * @param page
 * @param size
 */
export const useActivityGroupMemberByStatus = (
  status = 'PROGRESSING' as ActivityGroupStatusType,
  page = 0,
  size = 20,
) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY, status, page, size],
    queryFn: () => getActivityGroupByStatus(status, page, size),
  });
};
