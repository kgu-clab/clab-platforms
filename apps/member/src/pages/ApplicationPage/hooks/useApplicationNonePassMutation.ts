import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchApplicationNonePass } from '@api/application';
import { APPLICATION_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 지원 취소 상태를 설정
 */
export function useApplicationNonePassMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: patchApplicationNonePass,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: APPLICATION_QUERY_KEY.PAGES(),
      });
      toast({
        state: 'success',
        message: '불합격 상태로 변경됐어요.',
      });
    },
  });
}
