import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteSchedule, postSchedule } from '@api/schedule';
import { SCHEDULE_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 일정을 추가합니다.
 */
export function useScheduleMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
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

  return { scheduleMutate: mutation.mutate };
}

/**
 * 일정을 삭제합니다.
 */
export function useScheduleDeleteMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: (data) => {
      if (!data) {
        return toast({
          state: 'error',
          message: '일정 삭제를 실패했어요.',
        });
      }

      queryClient.invalidateQueries({ queryKey: SCHEDULE_QUERY_KEY.ALL });
      toast({
        state: 'success',
        message: '해당 일정이 삭제됐어요.',
      });
    },
  });

  return { scheduleDeleteMutate: mutation.mutate };
}
