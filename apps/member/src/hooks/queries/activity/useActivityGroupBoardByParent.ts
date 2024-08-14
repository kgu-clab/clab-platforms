import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityBoardByParent } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

/**
 * 부모 및 자식 게시판을 함께 반환합니다.
 */
export function useActivityGroupBoardByParent(
  parentId: number,
  page = 0,
  size = 20,
) {
  return useSuspenseQuery({
    queryKey: [...ACTIVITY_QUERY_KEY.BOARDS(), 'by-parent', parentId],
    queryFn: () => getActivityBoardByParent({ parentId, page, size }),
  });
}
