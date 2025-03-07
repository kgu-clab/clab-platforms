import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteSchedule } from '@api/schedule';
import { SCHEDULE_QUERY_KEY } from '@constants/key';
import { useToast } from '@hooks/common/useToast';

/**
 * 일정을 삭제합니다.
 */
export function useScheduleDeleteMutation() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: (data) => {
      if (!data) {
        return addToast({
          state: 'error',
          message: '일정 삭제를 실패했어요.',
        });
      } else {
        addToast({
          state: 'success',
          message: '해당 일정이 삭제됐어요.',
        });
      }

      queryClient.invalidateQueries({ queryKey: SCHEDULE_QUERY_KEY.ALL });
    },
  });
}
