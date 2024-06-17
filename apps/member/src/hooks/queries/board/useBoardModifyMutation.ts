import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchBoards } from '@api/board';
import { BOARD_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE, ERROR_MESSAGE } from '@constants/message';
import useToast from '@hooks/common/useToast';

/**
 * 게시글을 수정합니다.
 */
export const useBoardModifyMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: patchBoards,
    onSuccess: ({ success, errorMessage }, { id }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: BOARD_QUERY_KEY.DETAIL(id),
        });
        toast({
          state: 'success',
          message: '해당 게시글이 수정되었어요.',
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

  return { boardModifyMutate: mutation.mutate, isPending: mutation.isPending };
};
