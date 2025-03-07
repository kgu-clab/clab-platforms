import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postCommentWrite } from '@api/comment';
import { COMMENT_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE } from '@constants/message';
import { useToast } from '@hooks/common/useToast';

/**
 * 댓글을 작성합니다.
 */
export const useCommentCreateMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: postCommentWrite,
    onSuccess: ({ success, errorMessage }, { boardId }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: COMMENT_QUERY_KEY.DETAIL(boardId),
        });
      } else if (errorMessage) {
        addToast({
          state: 'error',
          message: API_ERROR_MESSAGE[errorMessage],
        });
      }
    },
  });

  return { commentWriteInfo: mutation.mutate };
};
