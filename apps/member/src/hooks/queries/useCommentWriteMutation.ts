import { postCommentWrite } from '@api/comment';
import { QUERY_KEY } from '@constants/key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCommentWriteMutation = () => {
  const queryClient = useQueryClient();

  const commentWrite = useMutation({
    mutationFn: postCommentWrite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COMMENTS] });
    },
  });

  return { commentWriteInfo: commentWrite.mutate };
};
