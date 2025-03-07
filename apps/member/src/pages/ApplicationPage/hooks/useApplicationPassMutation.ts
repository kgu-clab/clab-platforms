import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchApplicationPass } from '@api/application';
import { APPLICATION_QUERY_KEY } from '@constants/key';
import { useToast } from '@hooks/common/useToast';

/**
 * 지원 합격 상태를 설정
 */
export function useApplicationPassMutation() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: patchApplicationPass,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: APPLICATION_QUERY_KEY.PAGES(),
      });
      addToast({
        state: 'success',
        message: '합격 상태로 변경됐어요.',
      });
    },
  });
}
