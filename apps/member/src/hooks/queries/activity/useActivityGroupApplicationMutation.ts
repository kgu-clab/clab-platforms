import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchActivityGroupMemberApply } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import { useToast } from '@hooks/common/useToast';

/**
 * 활동 그룹의 멤버의 상태를 변경합니다.
 */
export function useActivityGroupApplicationMutation() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: patchActivityGroupMemberApply,
    onSuccess: (data) => {
      if (data) {
        addToast({
          state: 'success',
          message: '참여자 상태가 변경되었습니다.',
        });
      }
      const queryKeys = [
        ACTIVITY_QUERY_KEY.APPLICATION(data),
        ACTIVITY_QUERY_KEY.DETAIL(data),
      ];

      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });

  return {
    activityGroupApplicationMutate: mutation.mutate,
  };
}
