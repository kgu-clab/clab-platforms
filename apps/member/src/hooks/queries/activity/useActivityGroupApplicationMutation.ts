import { useMutation } from '@tanstack/react-query';

import { patchActivityGroupMemberApply } from '@api/activity';

export function useActivityGroupApplicationMutation() {
  const mutation = useMutation({
    mutationFn: patchActivityGroupMemberApply,
    onSuccess: () => {
      // TODO: 멤버의 ID가 리턴된다.
    },
  });

  return {
    activityGroupApplicationMutate: mutation.mutate,
  };
}
