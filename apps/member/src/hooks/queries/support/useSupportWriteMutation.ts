import { useNavigate } from 'react-router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postSupportsWrite } from '@api/support';
import { SUPPORT_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE } from '@constants/message';
import { PATH } from '@constants/path';
import { useToast } from '@hooks/common/useToast';

/**
 * 문의를 작성합니다.
 */
export const useSupportWriteMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postSupportsWrite,
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
          message: '문의가 작성되었어요.',
        });
      } else if (errorMessage) {
        addToast({
          state: 'error',
          message: API_ERROR_MESSAGE[errorMessage],
        });
      }
      navigate(PATH.SUPPORT_LIST);
    },
  });

  return { supportWriteMutate: mutation.mutate, isPending: mutation.isPending };
};
