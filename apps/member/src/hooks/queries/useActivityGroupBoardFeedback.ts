import { getActivityBoardsFeedback } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

/**
 * 제출 게시글에 대한 피드백을 조회합니다.
 * @param parentId 제출한 게시글 ID
 */
export const useActivityGroupBoardFeedback = (parentId: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY, parentId],
    queryFn: () => getActivityBoardsFeedback(parentId),
  });
};
