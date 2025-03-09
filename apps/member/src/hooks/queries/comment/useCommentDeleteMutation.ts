import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '@api/comment';
import { COMMENT_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE } from '@constants/message';
import { useToast } from '@hooks/common/useToast';

/**
 * 댓글을 삭제합니다.
 */
export const useCommentDeleteMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: ({ success, data: boardId, errorMessage }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: COMMENT_QUERY_KEY.DETAIL(boardId),
        });
        addToast({
          state: 'success',
          message: '해당 댓글이 삭제되었어요.',
        });
      } else if (errorMessage) {
        addToast({
          state: 'error',
          message: API_ERROR_MESSAGE[errorMessage],
        });
      }
    },
  });

  return { commentDeleteMutate: mutation.mutate };
};
