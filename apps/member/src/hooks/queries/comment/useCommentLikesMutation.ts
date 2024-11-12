import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postCommentLikes } from '@api/comment';
import { COMMENT_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

export const useCommentLikesMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: postCommentLikes,
    onSuccess: ({ success, data: boardId, errorMessage }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: COMMENT_QUERY_KEY.DETAIL(boardId),
        });
        toast({
          state: 'success',
          message: '좋아요를 눌렀어요.',
        });
      } else if (errorMessage) {
        toast({
          state: 'error',
          message: '문제가 발생했어요. 다시 시도해주세요.',
        });
      }
    },
  });

  return { commentLikesMutate: mutation.mutate };
};
