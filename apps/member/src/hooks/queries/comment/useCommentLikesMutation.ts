import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postCommentLikes } from '@api/comment';
import { COMMENT_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

export const useCommentLikesMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: postCommentLikes,
    onSuccess: ({ success, data, errorMessage }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: COMMENT_QUERY_KEY.DETAIL(data.boardId),
        });

        const message = `댓글에 좋아요를 ${data.isDeleted ? '취소' : '추가'}했어요.`;
        toast({
          state: 'success',
          message: message,
        });
      } else if (errorMessage) {
        toast({
          state: 'error',
          message: '문제가 발생했어요. 다시 시도해주세요.',
        });
      }
    },
  });

  return { commentLikesMutate: mutation.mutate, isPending: mutation.isPending };
};
