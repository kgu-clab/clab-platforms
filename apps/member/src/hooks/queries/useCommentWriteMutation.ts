import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postCommentWrite } from '@api/comment';
import { QUERY_KEY } from '@constants/key';

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
