import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityGroupApplyByStatus } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

/**
 * 활동 그룹의 신청자 목록을 가져옵니다.
 * @param activityGroupId 활동 그룹 ID
 * @param page 가져올 페이지 번호
 * @param size 가져올 데이터 개수
 */
export function useActivityGroupAdminApplyByStatus(
  activityGroupId: number,
  page = 0,
  size = 20,
) {
  return useSuspenseQuery({
    queryKey: ACTIVITY_QUERY_KEY.APPLICATION(activityGroupId),
    queryFn: () => getActivityGroupApplyByStatus(activityGroupId, page, size),
  });
}
