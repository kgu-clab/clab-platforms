import { useMutation } from '@tanstack/react-query';

import { patchActivityGroupMemberApply } from '@api/activity';

export const useActivityGroupAdminAcceptMutation = () => {
  const activityMemberAcceptMutation = useMutation({
    mutationFn: patchActivityGroupMemberApply,
    onSuccess: () => {
      // 멤버의 ID가 리턴된다.
    },
  });

  return {
    activityMemberAcceptMutate: activityMemberAcceptMutation.mutate,
  };
};
