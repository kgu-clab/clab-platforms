import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchBookLoanRecordApprove } from '@api/book';
import { BOOK_LOAN_RECORD_QUERY_KEY, MY_BOOK_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE } from '@constants/message';
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
          queryKey: MY_BOOK_QUERY_KEY.BOOKS(),
        });
        queryClient.invalidateQueries({
          queryKey: BOOK_LOAN_RECORD_QUERY_KEY.BORROWERS(),
        });
        toast({
          state: 'success',
          message: '해당 도서 대여를 승인했어요.',
        });
      } else if (errorMessage) {
        toast({ state: 'error', message: API_ERROR_MESSAGE[errorMessage] });
      }
    },
  });

  return { bookLoanRecordApproveMutate: bookLoanRecordApprove.mutate };
}
