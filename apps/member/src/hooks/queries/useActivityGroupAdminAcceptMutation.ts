import { useMutation } from '@tanstack/react-query';
import { patchActivityGroupMemberApply } from '@api/activity';

export const useActivityGroupAdminAcceptMutation = () => {
  const activityMemberAcceptMutation = useMutation({
    mutationFn: patchActivityGroupMemberApply,
    onError: (e) => {
      console.log(e);
    },
  });

  return {
    activityMemberAcceptMutate: activityMemberAcceptMutation.mutate,
  };
};
