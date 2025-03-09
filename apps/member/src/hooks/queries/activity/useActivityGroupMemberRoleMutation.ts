import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchActivityGroupMemberRole } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import { useToast } from '@hooks/common/useToast';

/**
 * 활동 멤버 역할을 변경합니다.
 */
export function useActivityGroupMemberRoleMutation() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: patchActivityGroupMemberRole,
    onSuccess: (data) => {
      if (!data) {
        return addToast({
          state: 'error',
          message: '멤버 권한 변경에 실패했어요.',
        });
      }
      addToast({
        state: 'success',
        message: '멤버 권한이 변경됐어요.',
      });

      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.APPLICATION(data),
      });
    },
  });

  return { activityGroupMemberRoleMutate: mutation.mutate };
}
