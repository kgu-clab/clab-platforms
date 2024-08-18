import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityBoardByCategory } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';

import { ActivityGroupBoardCategoryType } from '@type/activity';
import { WithPaginationParams } from '@type/api';

interface useActivityGroupBoardByCategoryProps extends WithPaginationParams {
  activityGroupId: number;
  category: ActivityGroupBoardCategoryType;
}

/**
 * 그룹 내에 카테고리에 따른 게시글을 조회합니다.
 */
export function useActivityGroupBoardByCategory({
  activityGroupId,
  category,
  page = 0,
  size = 20,
}: useActivityGroupBoardByCategoryProps) {
  return useSuspenseQuery({
    queryKey: ACTIVITY_QUERY_KEY.BOARD({
      id: activityGroupId,
      category: category,
    }),
    queryFn: () =>
      getActivityBoardByCategory({ activityGroupId, category, page, size }),
  });
}
