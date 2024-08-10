import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityBoardByCategory } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

import { ActivityGroupBoardCategoryType } from '@type/activity';

/**
 * 그룹 내에 카테고리에 따른 게시글을 조회합니다.
 */
export function useActivityGroupBoardByCategory(
  activityGroupId: number,
  category: ActivityGroupBoardCategoryType,
  page = 0,
  size = 20,
) {
  return useSuspenseQuery({
    queryKey: ACTIVITY_QUERY_KEY.BOARD(activityGroupId),
    queryFn: () =>
      getActivityBoardByCategory({ activityGroupId, category, page, size }),
  });
}
