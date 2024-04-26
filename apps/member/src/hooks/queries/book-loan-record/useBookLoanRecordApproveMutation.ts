import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchBookLoanRecordApprove } from '@api/book';
import { HTTP_ERROR_MESSAGE } from '@constants/api';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 도서 대여를 승인합니다.
 */
export function useBookLoanRecordApproveMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const bookLoanRecordApprove = useMutation({
    mutationFn: patchBookLoanRecordApprove,
    onSuccess: ({ success, errorMessage }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MY_BOOK],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_LOAN_RECORD_CONDITIONS],
        });
        toast({
          state: 'success',
          message: '해당 도서 대여를 승인했어요.',
        });
      } else if (errorMessage) {
        toast({ state: 'error', message: HTTP_ERROR_MESSAGE[errorMessage] });
      }
    },
  });

  return { bookLoanRecordApproveMutate: bookLoanRecordApprove.mutate };
}
