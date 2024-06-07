import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBorrowBook } from '@api/book';
import {
  BOOK_LOAN_RECORD_QUERY_KEY,
  BOOK_QUERY_KEY,
  MY_BOOK_QUERY_KEY,
} from '@constants/key';
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
          queryKey: BOOK_QUERY_KEY.DETAIL(bookId),
        });
        queryClient.invalidateQueries({
          queryKey: BOOK_LOAN_RECORD_QUERY_KEY.BOOK(bookId),
        });
        queryClient.invalidateQueries({
          queryKey: MY_BOOK_QUERY_KEY.BOOKS(),
        });
        queryClient.invalidateQueries({
          queryKey: BOOK_LOAN_RECORD_QUERY_KEY.BORROWER(borrowerId),
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
