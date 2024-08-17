import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityBoard } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

/**
 * 활동 그룹의 게시판을 조회합니다.
 */
export function useActivityGroupBoard(id: number) {
  return useSuspenseQuery({
    queryKey: ACTIVITY_QUERY_KEY.BOARD({ id: id }),
    queryFn: () => getActivityBoard(id),
  });
}
