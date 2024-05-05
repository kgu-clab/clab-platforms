import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBorrowBook } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE, ERROR_MESSAGE } from '@constants/message';
import useToast from '@hooks/common/useToast';

/**
 * 도서 대출을 요청합니다.
 */
export function useBookLoanBorrowMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const bookBorrowMutation = useMutation({
    mutationFn: postBorrowBook,
    onSuccess: ({ success, errorMessage }, { bookId, borrowerId }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_DETAIL, bookId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_LOAN_RECORD_CONDITIONS, bookId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MY_BOOK, borrowerId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_LOAN_RECORD, borrowerId],
        });
        toast({
          state: 'success',
          message: '해당 도서를 대여 신청했어요.',
        });
      } else if (errorMessage) {
        toast({
          state: 'error',
          message: API_ERROR_MESSAGE[errorMessage],
        });
      }
    },
    onError: () => {
      toast({
        state: 'error',
        message: ERROR_MESSAGE.NETWORK,
      });
    },
  });

  return { bookBorrowMutate: bookBorrowMutation.mutate };
}
