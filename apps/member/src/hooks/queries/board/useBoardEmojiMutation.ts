import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBoardsEmoji } from '@api/board';
import { BOARD_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

export const useBoardEmojiMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: postBoardsEmoji,
    onSuccess: ({ success, data }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: BOARD_QUERY_KEY.DETAIL(Number(data)),
        });
        toast({
          state: 'success',
          message: '게시물에 반응을 추가했어요.',
        });
      } else {
        toast({
          state: 'error',
          message: '문제가 발생했어요. 다시 시도해주세요.',
        });
      }
    },
  });

  return { boardEmojiMutate: mutation.mutate, isPending: mutation.isPending };
};
