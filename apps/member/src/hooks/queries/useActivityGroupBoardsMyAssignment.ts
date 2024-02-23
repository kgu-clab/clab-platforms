import { getActivityBoardsMyAssignment } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { IDType } from '@type/api';

/**
 * 내가 과제를 제출한 활동 그룹의 게시판을 조회합니다.
 * @param id
 * @returns
 */
export const useActivityGroupBoardsMyAssignment = (id: IDType) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY_BOARDS, id],
    queryFn: () => getActivityBoardsMyAssignment(id),
  });
};
