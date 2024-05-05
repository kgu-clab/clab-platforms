import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '@api/comment';
import { QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE, ERROR_MESSAGE } from '@constants/message';
import useToast from '@hooks/common/useToast';

/**
 * 댓글을 삭제합니다.
 */
export const useCommentDeleteMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: ({ success, data: id, errorMessage }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.COMMENTS, id],
        });
        toast({
          state: 'success',
          message: '해당 댓글이 삭제되었어요.',
        });
      } else if (errorMessage) {
        toast({
          state: 'error',
          message: API_ERROR_MESSAGE[errorMessage],
        });
      }
    },
    onError: () => {
      toast({
        state: 'error',
        message: ERROR_MESSAGE.NETWORK,
      });
    },
  });

  return { commentDeleteMutate: mutation.mutate };
};
