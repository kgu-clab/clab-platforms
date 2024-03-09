import { postMembershipFee } from '@api/membershipFee';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * 회비를 신청합니다.
 */
export const useMembershipFeeMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const membershipFeeMutation = useMutation({
    mutationFn: postMembershipFee,
    onSuccess: (id) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MEMBERSHIP_FEE, id],
      });
      toast({ state: 'success', message: '신청이 완료되었습니다.' });
    },
  });

  return { membershipFeeMutate: membershipFeeMutation.mutate };
};
