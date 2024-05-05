import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBoardsWrite } from '@api/board';
import { QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE, ERROR_MESSAGE } from '@constants/message';
import { PATH } from '@constants/path';
import useToast from '@hooks/common/useToast';

/**
 * 게시글을 작성합니다.
 */
export const useBoardWriteMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postBoardsWrite,
    onSuccess: ({ success, data: category, errorMessage }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOARDS, category],
        });
        toast({
          state: 'success',
          message: '게시글이 작성되었어요.',
        });
      } else if (errorMessage) {
        toast({
          state: 'error',
          message: API_ERROR_MESSAGE[errorMessage],
        });
      }
      navigate(PATH.COMMUNITY);
    },
    onError: () => {
      toast({
        state: 'error',
        message: ERROR_MESSAGE.NETWORK,
      });
    },
  });

  return { boardWriteMutate: mutation.mutate };
};
