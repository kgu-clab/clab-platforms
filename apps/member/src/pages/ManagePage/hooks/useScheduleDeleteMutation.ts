import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteSchedule } from '@api/schedule';
import { SCHEDULE_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 일정을 삭제합니다.
 */
export function useScheduleDeleteMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: (data) => {
      if (!data) {
        return toast({
          state: 'error',
          message: '일정 삭제를 실패했어요.',
        });
      } else {
        toast({
          state: 'success',
          message: '해당 일정이 삭제됐어요.',
        });
      }

      queryClient.invalidateQueries({ queryKey: SCHEDULE_QUERY_KEY.ALL });
    },
  });
}
