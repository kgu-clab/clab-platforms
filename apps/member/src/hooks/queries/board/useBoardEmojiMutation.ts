import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBoardsEmoji } from '@api/board';
import { BOARD_QUERY_KEY, ORGANIZATION_QUERY_KEY } from '@constants/key';
import { useToast } from '@hooks/common/useToast';

export const useBoardEmojiMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: postBoardsEmoji,
    onSuccess: ({ success, data }) => {
      if (success) {
        const queryKey =
          data.category === 'organization'
            ? ORGANIZATION_QUERY_KEY.DETAIL(data.boardId)
            : BOARD_QUERY_KEY.DETAIL(data.boardId);
        queryClient.invalidateQueries({ queryKey });

        const message = `게시물에 ${data.emoji}를 ${data.isDeleted ? '취소' : '추가'}했어요.`;
        addToast({
          state: 'success',
          message: message,
        });
      } else {
        addToast({
          state: 'error',
          message: '문제가 발생했어요. 다시 시도해주세요.',
        });
      }
    },
  });

  return { boardEmojiMutate: mutation.mutate, isPending: mutation.isPending };
};
