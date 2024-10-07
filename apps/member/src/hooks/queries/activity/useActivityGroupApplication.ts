import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityGroupApplyByStatus } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

import { WithPaginationParams } from '@type/api';

interface Params extends WithPaginationParams {
  activityGroupId: number;
}

/**
 * 활동 그룹의 신청자 목록을 가져옵니다.
 */
export function useActivityGroupApplication({
  activityGroupId,
  page = 0,
  size = 20,
}: Params) {
  return useSuspenseQuery({
    queryKey: ACTIVITY_QUERY_KEY.APPLICATIONS_PAGE(activityGroupId, {
      page,
      size,
    }),
    queryFn: () => getActivityGroupApplyByStatus(activityGroupId, page, size),
  });
}
