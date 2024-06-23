import { useMutation } from '@tanstack/react-query';

import { postActivityGroupMemberApply } from '@api/activity';
import useToast from '@hooks/common/useToast';

/**
 * 활동을 신청합니다.
 */
export function useActivityGroupMemberMutation() {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: postActivityGroupMemberApply,
    onSuccess: (data) => {
      if (!data) {
        toast({
          state: 'error',
          message: '신청에 실패했습니다.',
        });
      } else {
        toast({
          state: 'success',
          message: '신청이 완료되었습니다.',
        });
      }
    },
  });

  return { activityGroupMemberMutate: mutation.mutate };
}
