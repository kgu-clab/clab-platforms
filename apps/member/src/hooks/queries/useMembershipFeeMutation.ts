import { postMembershipFee } from '@api/membershipFee';
import { useMutation } from '@tanstack/react-query';

export const useMembershipFeeMutation = () => {
  const membershipFeeMutation = useMutation({
    mutationFn: postMembershipFee,
  });

  return { membershipFeeMutate: membershipFeeMutation.mutate };
};
