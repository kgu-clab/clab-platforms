import { getActivityBoard } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

/**
 * 활동 그룹의 게시판을 조회합니다.
 * @param id 활동 그룹 아이디
 */

export const useActivityGroupBoard = (id: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY_BOARDS, id],
    queryFn: () => getActivityBoard(id),
  });
};
