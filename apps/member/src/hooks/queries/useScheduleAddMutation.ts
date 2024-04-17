import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postSchedule } from '@api/schedule';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 일정을 추가합니다.
 */
export const useScheduleAddMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const scheduleAddMutation = useMutation({
    mutationFn: postSchedule,
    onSuccess: (res) => {
      if (!res) {
        toast({
          state: 'error',
          message: '일정 추가를 실패했어요.',
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.SCHEDULE],
        });
        toast({
          state: 'success',
          message: '새로운 일정이 추가됐어요.',
        });
      }
    },
  });

  return { scheduleAddMutate: scheduleAddMutation.mutate };
};
