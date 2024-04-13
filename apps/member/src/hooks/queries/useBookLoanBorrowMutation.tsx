import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBorrowBook } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 도서 대출을 요청합니다.
 */
export const useBookLoanBorrowMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const bookBorrowMutation = useMutation({
    mutationFn: postBorrowBook,
    onSuccess: (data, variables) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_DETAIL, variables.bookId],
        });
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEY.BOOK_LOAN_RECORD_CONDITIONS,
            variables.borrowerId,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MY_BOOK, variables.borrowerId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_LOAN_RECORD, variables.borrowerId],
        });
        toast({
          state: 'success',
          message: '성공적으로 도서를 대출했습니다.',
        });
      } else {
        toast({
          state: 'error',
          message: '도서 대출에 실패했습니다.',
        });
      }
    },
    onError: () => {
      toast({
        state: 'error',
        message: '도서 대출에 실패했습니다.',
      });
    },
  });

  return { bookBorrowMutate: bookBorrowMutation.mutate };
};
