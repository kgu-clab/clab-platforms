import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchActivityGroupAdmin } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 활동을 수정합니다.
 */
export function useActivityGroupAdminMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: patchActivityGroupAdmin,
    onSuccess: (data) => {
      if (!data) {
        toast({
          state: 'error',
          message: '활동 수정에 실패했습니다.',
        });
      } else {
        toast({
          state: 'success',
          message: '활동 수정이 완료되었습니다.',
        });
      }
      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.DETAIL(data),
      });
      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.STATUSES(),
      });
    },
  });

  return { activityGroupAdminMutate: mutation.mutate };
}
