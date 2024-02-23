import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { postActivityBoard } from '@api/activity';
import useToast from '@hooks/common/useToast';

/**
 * 활동 그룹 게시글을 작성합니다.
 * @returns
 */
export const useActivityGroupBoardMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const activityGroupBoardMutation = useMutation({
    mutationFn: postActivityBoard,
    onSuccess: (res) => {
      if (res.files.length > 0) {
        toast({
          state: 'success',
          message: '제출이 성공적으로 됐습니다.',
        });
      }
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ACTIVITY] });
    },
  });

  return {
    activityGroupBoardMutate: activityGroupBoardMutation.mutate,
  };
};
