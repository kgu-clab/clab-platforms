import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postActivityGroupMemberApply } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE } from '@constants/message';
import useToast from '@hooks/common/useToast';

/**
 * 활동을 신청합니다.
 */
export function useActivityGroupMemberMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    mutate: activityGroupMemberMutate,
    isPending: activityGroupMemberIsPending,
  } = useMutation({
    mutationFn: postActivityGroupMemberApply,
    onSuccess: ({ success, data: data, errorMessage }) => {
      if (errorMessage) {
        toast({
          state: 'error',
          message: API_ERROR_MESSAGE[errorMessage],
        });
      } else if (success) {
        toast({
          state: 'success',
          message: '신청이 완료되었습니다.',
        });
      }

      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.APPLICATION(data),
      });
      queryClient.invalidateQueries({
        queryKey: ACTIVITY_QUERY_KEY.MY_APPLIED(),
      });
    },
  });

  return {
    activityGroupMemberMutate,
    activityGroupMemberIsPending,
  };
}
