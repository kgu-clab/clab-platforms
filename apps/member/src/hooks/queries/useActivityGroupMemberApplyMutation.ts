import { useMutation } from '@tanstack/react-query';

import { postActivityGroupMemberApply } from '@api/activity';
import useToast from '@hooks/common/useToast';

/**
 * 활동을 신청합니다.
 */
export const useActivityGroupMemberApplyMutation = () => {
  const toast = useToast();

  const activityGroupMemberMutation = useMutation({
    mutationFn: postActivityGroupMemberApply,
    onSuccess: (res) => {
      if (!res) {
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

  return { activityGroupMemberMutate: activityGroupMemberMutation.mutate };
};
