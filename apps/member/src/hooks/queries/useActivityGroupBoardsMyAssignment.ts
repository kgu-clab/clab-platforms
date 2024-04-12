import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityBoardsMyAssignment } from '@api/activity';
import { QUERY_KEY } from '@constants/key';

/**
 * 내가 과제를 제출한 활동 그룹의 게시판을 조회합니다.
 * @param id 과제 게시글 아이디
 */
export const useActivityGroupBoardsMyAssignment = (id: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY_BOARDS_MY_ASSIGNMENT, id],
    queryFn: () => getActivityBoardsMyAssignment(id),
  });
};
