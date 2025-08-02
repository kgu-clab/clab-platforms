import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchAnswers } from '@api/support';
import { SUPPORT_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE, ERROR_MESSAGE } from '@constants/message';
import { useToast } from '@hooks/common/useToast';

/**
 * 답변을 수정합니다.
 */
export const useAnswerModifyMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: patchAnswers,
    onSuccess: ({ success, data: id, errorMessage }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: SUPPORT_QUERY_KEY.COLLECTIONS(),
        });
        queryClient.invalidateQueries({
          queryKey: SUPPORT_QUERY_KEY.DETAIL(id),
        });
      } else if (errorMessage) {
        addToast({
          state: 'error',
          message: API_ERROR_MESSAGE[errorMessage],
        });
      }
    },
    onError: () => {
      addToast({
        state: 'error',
        message: ERROR_MESSAGE.NETWORK,
      });
    },
  });

  return { answerModifyMutate: mutation.mutate, isPending: mutation.isPending };
};
