import { getActivityBoardsMyAssignment } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useActivityGroupBoardsMyAssignment = (parentId: string) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY_FEEDBACK, parentId],
    queryFn: () => getActivityBoardsMyAssignment(parentId),
  });
};
