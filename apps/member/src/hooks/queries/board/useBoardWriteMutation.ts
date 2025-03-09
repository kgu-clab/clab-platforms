import { useNavigate } from 'react-router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBoardsWrite } from '@api/board';
import { BOARD_QUERY_KEY, HASHTAG_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE } from '@constants/message';
import { PATH } from '@constants/path';
import { useToast } from '@hooks/common/useToast';

/**
 * 게시글을 작성합니다.
 */
export const useBoardWriteMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postBoardsWrite,
    onSuccess: ({ success, data: category, errorMessage }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: BOARD_QUERY_KEY.CATEGORY_PAGES(category),
        });
        queryClient.invalidateQueries({
          queryKey: BOARD_QUERY_KEY.MY(),
        });
        queryClient.invalidateQueries({
          queryKey: HASHTAG_QUERY_KEY.LIST(),
        });
        addToast({
          state: 'success',
          message: '게시글이 작성되었어요.',
        });
      } else if (errorMessage) {
        addToast({
          state: 'error',
          message: API_ERROR_MESSAGE[errorMessage],
        });
      }
      navigate(PATH.COMMUNITY);
    },
  });

  return { boardWriteMutate: mutation.mutate, isPending: mutation.isPending };
};
