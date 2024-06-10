import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityGroupDetail } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

/**
 * 활동에 대해 상세 조회합니다.
 */
export function useActivityGroup(id: number) {
  return useSuspenseQuery({
    queryFn: () => getActivityGroupDetail(id),
    queryKey: ACTIVITY_QUERY_KEY.DETAIL(id),
  });
}
