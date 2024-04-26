import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postReturnBook } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import { ERROR_MESSAGE } from '@constants/message';
import useToast from '@hooks/common/useToast';

/**
 * 대출한 도서를 반납합니다.
 */
export function useBookLoanReturnMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const bookReturnMutation = useMutation({
    mutationFn: postReturnBook,
    onSuccess: (data, variables) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_DETAIL, variables.bookId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_LOAN_RECORD_CONDITIONS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_LOAN_RECORD, variables.borrowerId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MY_BOOK, variables.borrowerId],
        });
        toast({
          state: 'success',
          message: '도서 대여가 반납되었어요.',
        });
      } else {
        toast({
          state: 'error',
          message: ERROR_MESSAGE.NETWORK,
        });
      }
    },
  });

  return { bookReturnMutate: bookReturnMutation.mutate };
}
