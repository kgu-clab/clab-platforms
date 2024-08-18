import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityGroupMember } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

import { WithPaginationParams } from '@type/api';

interface useActivityGroupMemberListProps extends WithPaginationParams {
  activityGroupId: number;
}
/**
 *  활동 그룹 내 인원을 조회합니다.
 */
export function useActivityGroupMemberList({
  activityGroupId,
  page = 0,
  size = 20,
}: useActivityGroupMemberListProps) {
  return useSuspenseQuery({
    queryKey: ACTIVITY_QUERY_KEY.MEMBER(activityGroupId),
    queryFn: () => getActivityGroupMember({ activityGroupId, page, size }),
  });
}
