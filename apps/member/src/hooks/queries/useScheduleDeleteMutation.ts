import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteSchedule } from '@api/schedule';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 일정을 삭제합니다.
 */
export const useScheduleDeleteMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const scheduleDeleteMutation = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.SCHEDULE],
        });
        toast({
          state: 'success',
          message: '해당 일정이 삭제됐어요.',
        });
      }
    },
  });

  return { scheduleDeleteMutate: scheduleDeleteMutation.mutate };
};
