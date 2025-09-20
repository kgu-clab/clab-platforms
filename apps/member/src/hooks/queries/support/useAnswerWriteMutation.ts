import { useNavigate } from 'react-router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postAnswersWrite } from '@api/support';
import { SUPPORT_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE } from '@constants/message';
import { PATH } from '@constants/path';
import { useToast } from '@hooks/common/useToast';

/**
 * 답변을 작성합니다.
 */
export const useAnswerWriteMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postAnswersWrite,
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
      navigate(PATH.SUPPORT_LIST);
    },
  });

  return { answerWriteMutate: mutation.mutate, isPending: mutation.isPending };
};
