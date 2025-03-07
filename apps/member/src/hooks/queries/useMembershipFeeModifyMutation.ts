import { useMutation, useQueryClient } from '@tanstack/react-query';

import { pathMembershipFee } from '@api/membershipFee';
import { MEMBERSHIP_FEE_QUERY_KEY } from '@constants/key';
import { ERROR_MESSAGE } from '@constants/message';
import { useToast } from '@hooks/common/useToast';

/**
 * 회비 정보를 수정합니다.
 */
export const useMembershipFeeModifyMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const membershipFeeModifyMutation = useMutation({
    mutationFn: pathMembershipFee,
    onSuccess: (_, { body }) => {
      queryClient.invalidateQueries({
        queryKey: MEMBERSHIP_FEE_QUERY_KEY.ALL,
      });
      switch (body.status) {
        case 'APPROVED':
          addToast({
            state: 'success',
            message: '해당 회비 사용 신청서를 승인처리 하였습니다.',
          });
          break;
        case 'REJECTED':
          addToast({
            state: 'success',
            message: '해당 회비 사용 신청서를 반려처리 하였습니다.',
          });
          break;
        default:
          addToast({
            state: 'error',
            message: ERROR_MESSAGE.DEFAULT,
          });
          break;
      }
    },
  });

  return {
    membershipFeeModifyMutate: membershipFeeModifyMutation.mutate,
  };
};
