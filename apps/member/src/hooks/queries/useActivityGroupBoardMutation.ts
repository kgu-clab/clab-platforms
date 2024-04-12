import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postActivityBoard } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 활동 그룹 게시글을 생성합니다.
 */
export const useActivityGroupBoardMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const activityGroupBoardMutation = useMutation({
    mutationFn: postActivityBoard,
    onSuccess: (res) => {
      if (res) {
        toast({
          state: 'success',
          message: '게시글이 작성되었습니다.',
        });
      }
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ACTIVITY_BOARDS_MY_ASSIGNMENT, res.parentId],
      });
    },
  });

  return {
    activityGroupBoardMutate: activityGroupBoardMutation.mutate,
  };
};
