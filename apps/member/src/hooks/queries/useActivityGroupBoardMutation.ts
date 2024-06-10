import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postActivityBoard } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 활동 그룹 게시글을 생성합니다.
 */
export function useActivityGroupBoardMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const activityGroupBoardMutation = useMutation({
    mutationFn: postActivityBoard,
    onSuccess: (data) => {
      if (data) {
        toast({
          state: 'success',
          message: '게시글이 작성되었습니다.',
        });
      }
      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.MY_ASSIGNMENT(data.id),
      });
    },
  });

  return {
    activityGroupBoardMutate: activityGroupBoardMutation.mutate,
  };
}
