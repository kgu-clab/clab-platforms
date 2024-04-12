import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchSharedAccountStatus } from '@api/SharedAccount';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

export const useSharedAccountsChangeStatusMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const sharedAccountsStatusMutation = useMutation({
    mutationFn: patchSharedAccountStatus,
    onSuccess: (res) => {
      if (!res) {
        toast({
          state: 'error',
          message: '이용 취소/완료에 실패했습니다.',
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.SHARED_ACCOUNT_USAGE],
        });
        toast({
          state: 'success',
          message: '이용 취소/완료되었습니다.',
        });
      }
    },
  });

  return {
    sharedAccountsStatusMutate: sharedAccountsStatusMutation.mutate,
  };
};
