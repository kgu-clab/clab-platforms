import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postMembershipFee } from '@api/membershipFee';
import { QUERY_KEY } from '@constants/key';
import { ERROR_MESSAGE } from '@constants/message';
import useToast from '@hooks/common/useToast';

/**
 * 회비를 신청합니다.
 */
export const useMembershipFeeMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const membershipFeeMutation = useMutation({
    mutationFn: postMembershipFee,
    onSuccess: ({ success }) => {
      if (!success) {
        return toast({ state: 'error', message: ERROR_MESSAGE.DEFAULT });
      }
      toast({ state: 'success', message: '신청이 완료되었습니다.' });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MEMBERSHIP_FEE],
      });
    },
  });

  membershipFeeMutation.isSuccess;

  return {
    membershipFeeMutate: membershipFeeMutation.mutate,
    isPending: membershipFeeMutation.isPending,
  };
};
