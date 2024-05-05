import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchBoards } from '@api/board';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

export const useBoardModifyMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const boardModifyMutation = useMutation({
    mutationFn: patchBoards,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BORDER_FREE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BORDER_QNA],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BORDER_GRADUATED],
      });
      toast({
        state: 'success',
        message: '글이 성공적으로 수정되었습니다.',
      });
    },
  });

  return { boardModifyMutate: boardModifyMutation.mutate };
};
