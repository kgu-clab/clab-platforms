import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBoards } from '@api/board';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 게시글을 삭제합니다.
 */
export const useBoardDeleteMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const boardDeleteMutation = useMutation({
    mutationFn: deleteBoards,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BORDER_NOTICE],
      });
      toast({
        state: 'success',
        message: '해당 게시글을 삭제하였습니다.',
      });
    },
  });

  return { boardDeleteMutate: boardDeleteMutation.mutate };
};
