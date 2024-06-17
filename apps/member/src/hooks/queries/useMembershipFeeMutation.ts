import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postMembershipFee } from '@api/membershipFee';
import { MEMBERSHIP_FEE_QUERY_KEY } from '@constants/key';
import { ERROR_MESSAGE } from '@constants/message';
import useToast from '@hooks/common/useToast';

/**
 * 회비를 신청합니다.
 */
export const useMembershipFeeMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: postMembershipFee,
    onSuccess: ({ success }) => {
      if (success) {
        toast({ state: 'success', message: '신청이 완료되었습니다.' });
        queryClient.invalidateQueries({
          queryKey: MEMBERSHIP_FEE_QUERY_KEY.ALL,
        });
      } else {
        return toast({ state: 'error', message: ERROR_MESSAGE.DEFAULT });
      }
    },
    onError: () => {
      toast({ state: 'error', message: ERROR_MESSAGE.NETWORK });
    },
  });

  return {
    membershipFeeMutate: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};
