import { useMutation } from '@tanstack/react-query';

import { patchActivityGroupMemberApply } from '@api/activity';
import useToast from '@hooks/common/useToast';

export function useActivityGroupApplicationMutation() {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: patchActivityGroupMemberApply,
    onSuccess: (data) => {
      if (data) {
        toast({
          state: 'success',
          message: '참여자 상태가 변경되었습니다.',
        });
      }
    },
  });

  return {
    activityGroupApplicationMutate: mutation.mutate,
  };
}
