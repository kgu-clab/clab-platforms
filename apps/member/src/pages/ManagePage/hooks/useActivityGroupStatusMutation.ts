import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchActivityGroup } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import { ACTIVITY_STATE } from '@constants/state';
import { useToast } from '@hooks/common/useToast';

/**
 * 활동 상태를 변경합니다.
 */
export function useActivityGroupStatusMutation() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: patchActivityGroup,
    onSuccess: (data) => {
      if (!data) {
        addToast({
          state: 'error',
          message: '활동 상태 변경에 실패했습니다.',
        });
      } else {
        addToast({
          state: 'success',
          message: '활동 상태가 변경되었습니다',
        });
      }
      const queryKeys = [
        ACTIVITY_QUERY_KEY.STATUS(ACTIVITY_STATE.END),
        ACTIVITY_QUERY_KEY.STATUS(ACTIVITY_STATE.PROGRESSING),
        ACTIVITY_QUERY_KEY.STATUS(ACTIVITY_STATE.WAITING),
        ACTIVITY_QUERY_KEY.DETAIL(data.id),
      ];

      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });

  return { activityGroupStatusMutate: mutation.mutate };
}
