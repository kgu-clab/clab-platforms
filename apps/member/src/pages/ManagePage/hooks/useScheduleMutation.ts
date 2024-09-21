import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postSchedule } from '@api/schedule';
import { SCHEDULE_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 일정을 추가합니다.
 */
export function useScheduleMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: postSchedule,
    onSuccess: (data) => {
      if (!data) {
        return toast({
          state: 'error',
          message: '일정 추가를 실패했어요.',
        });
      }

      queryClient.invalidateQueries({ queryKey: SCHEDULE_QUERY_KEY.ALL });
      toast({
        state: 'success',
        message: '새로운 일정이 추가됐어요.',
      });
    },
  });
}
