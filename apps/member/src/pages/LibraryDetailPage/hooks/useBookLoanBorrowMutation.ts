import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBorrowBook } from '@api/book';
import { BOOK_LOAN_RECORD_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE } from '@constants/message';
import { useToast } from '@hooks/common/useToast';

/**
 * 도서 대여를 신청합니다.
 */
export function useBookLoanBorrowMutation() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: postBorrowBook,
    onSuccess: ({ success, errorMessage }, { bookId, borrowerId }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: BOOK_LOAN_RECORD_QUERY_KEY.BOOK(bookId),
        });
        queryClient.invalidateQueries({
          queryKey: BOOK_LOAN_RECORD_QUERY_KEY.BORROWER(borrowerId),
        });
        queryClient.invalidateQueries({
          queryKey: BOOK_LOAN_RECORD_QUERY_KEY.RECORDS_PAGE(),
        });

        addToast({
          state: 'success',
          message: '해당 도서를 대여 신청했어요.',
        });
      } else if (errorMessage) {
        addToast({
          state: 'error',
          message: API_ERROR_MESSAGE[errorMessage],
        });
      }
    },
  });

  return { bookBorrowMutate: mutation.mutate };
}
