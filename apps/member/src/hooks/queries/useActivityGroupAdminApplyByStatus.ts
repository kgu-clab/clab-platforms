import { getActivityGroupApplyByStatus } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

/**
 * 활동 그룹의 신청자 목록을 가져옵니다.
 * @param activityGroupId 활동 그룹 ID
 * @param page 가져올 페이지 번호
 * @param size 가져올 데이터 개수
 */
export const useActivityGroupAdminApplyByStatus = (
  activityGroupId: number,
  page = 0,
  size = 20,
) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY_GROUP_APPLY, activityGroupId],
    queryFn: () => getActivityGroupApplyByStatus(activityGroupId, page, size),
  });
};
