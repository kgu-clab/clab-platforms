import { useNavigate } from 'react-router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteSupports } from '@api/support';
import { SUPPORT_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE, ERROR_MESSAGE } from '@constants/message';
import { PATH } from '@constants/path';
import { useToast } from '@hooks/common/useToast';

/**
 * 문의를 삭제합니다.
 */
export const useSupportDeleteMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteSupports,
    onSuccess: ({ success, data: id, errorMessage }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: SUPPORT_QUERY_KEY.DETAIL(id),
        });
        queryClient.invalidateQueries({
          queryKey: SUPPORT_QUERY_KEY.COLLECTIONS(),
        });
        addToast({
          state: 'success',
          message: '해당 문의가 삭제되었어요.',
        });
      } else if (errorMessage) {
        addToast({
          state: 'error',
          message: API_ERROR_MESSAGE[errorMessage],
        });
      }
      navigate(PATH.SUPPORT_LIST);
    },
    onError: () => {
      addToast({
        state: 'error',
        message: ERROR_MESSAGE.DEFAULT,
      });
    },
  });

  return { supportDeleteMutate: mutation.mutate };
};
