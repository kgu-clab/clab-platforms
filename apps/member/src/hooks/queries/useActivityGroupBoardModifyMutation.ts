import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchActivityBoard } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 활동 그룹 게시글을 수정합니다.
 */
export function useActivityGroupBoardModifyMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const activityGroupBoardModifyMutation = useMutation({
    mutationFn: patchActivityBoard,
    onSuccess: (data) => {
      if (data) {
        toast({
          state: 'success',
          message: '게시글이 수정이 됐어요.',
        });
      }
      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.MY_ASSIGNMENT(data.id),
      });
    },
  });

  return {
    activityGroupBoardModifyMutate: activityGroupBoardModifyMutation.mutate,
  };
}
