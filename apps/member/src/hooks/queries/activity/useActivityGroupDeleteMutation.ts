import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteActivityGroup } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import { ACTIVITY_STATE } from '@constants/state';
import useToast from '@hooks/common/useToast';

/**
 * 활동을 삭제합니다.
 */
export function useActivityGroupDeleteMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: deleteActivityGroup,
    onSuccess: (data) => {
      if (!data) {
        toast({
          state: 'error',
          message: '활동 그룹 삭제에 실패했습니다.',
        });
      } else {
        toast({
          state: 'success',
          message: '활동 그룹 삭제에 성공했습니다.',
        });
      }
      const queryKeys = [
        ACTIVITY_QUERY_KEY.STATUSES(),
        ACTIVITY_QUERY_KEY.STATUSES_PAGES(ACTIVITY_STATE.END),
        ACTIVITY_QUERY_KEY.STATUSES_PAGES(ACTIVITY_STATE.PROGRESSING),
        ACTIVITY_QUERY_KEY.STATUSES_PAGES(ACTIVITY_STATE.WAITING),
        ACTIVITY_QUERY_KEY.DETAIL(data),
      ];

      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });

  return { activityGroupDeleteMutate: mutation.mutate };
}
