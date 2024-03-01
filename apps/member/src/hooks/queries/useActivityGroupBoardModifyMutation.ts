import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { patchActivityBoard } from '@api/activity';
import useToast from '@hooks/common/useToast';

/**
 * 활동 그룹 게시글을 수정합니다.
 */
export const useActivityGroupBoardModifyMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const activityGroupBoardModifyMutation = useMutation({
    mutationFn: patchActivityBoard,
    onSuccess: (res) => {
      if (res) {
        toast({
          state: 'success',
          message: '수정이 됐어요.',
        });
      }
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ACTIVITY_BOARDS_MY_ASSIGNMENT, res.parentId],
      });
    },
  });

  return {
    activityGroupBoardModifyMutate: activityGroupBoardModifyMutation.mutate,
  };
};
