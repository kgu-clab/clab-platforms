import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityBoardsMyAssignment } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

/**
 * 내가 과제를 제출한 활동 그룹의 게시판을 조회합니다.
 */
export function useActivityGroupBoardsMyAssignment(id: number) {
  return useSuspenseQuery({
    queryKey: ACTIVITY_QUERY_KEY.MY_ASSIGNMENT(id),
    queryFn: () => getActivityBoardsMyAssignment(id),
  });
}
