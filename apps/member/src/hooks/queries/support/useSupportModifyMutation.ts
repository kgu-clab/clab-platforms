import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchSupports } from '@api/support';
import { SUPPORT_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE, ERROR_MESSAGE } from '@constants/message';
import { useToast } from '@hooks/common/useToast';

/**
 * 문의를 수정합니다.
 */
export const useSupportModifyMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: patchSupports,
    onSuccess: ({ success, data: id, errorMessage }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: SUPPORT_QUERY_KEY.COLLECTIONS(),
        });
        queryClient.invalidateQueries({
          queryKey: SUPPORT_QUERY_KEY.DETAIL(id),
        });
        addToast({
          state: 'success',
          message: '해당 문의가 수정되었어요.',
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
        message: ERROR_MESSAGE.DEFAULT,
      });
    },
  });

  return {
    supportModifyMutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};
