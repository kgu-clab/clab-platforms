import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';
import { postSharedAccountUsage } from '@api/SharedAccount';

export const useSharedAccountsUsageMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const sharedAccountsUsageMutation = useMutation({
    mutationFn: postSharedAccountUsage,
    onSuccess: (res) => {
      if (!res) {
        toast({
          state: 'error',
          message: '이용 신청이 거절되었습니다.',
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.SHARED_ACCOUNT],
        });
        toast({
          state: 'success',
          message: '이용이 신청되었습니다.',
        });
      }
    },
  });

  return { sharedAccountsUsageMutate: sharedAccountsUsageMutation.mutate };
};
