import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBoards } from '@api/board';
import { QUERY_KEY } from '@constants/key';
import { PATH } from '@constants/path';
import useToast from '@hooks/common/useToast';

/**
 * 게시글을 삭제합니다.
 */
export const useBoardDeleteMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  const boardDeleteMutation = useMutation({
    mutationFn: deleteBoards,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BORDER_NOTICE],
      });
      toast({
        state: 'success',
        message: '해당 게시글이 삭제되었어요.',
      });
      navigate(PATH.COMMUNITY);
    },
  });

  return { boardDeleteMutate: boardDeleteMutation.mutate };
};
