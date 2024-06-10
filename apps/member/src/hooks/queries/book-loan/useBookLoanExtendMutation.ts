import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postExtendBook } from '@api/book';
import { BOOK_LOAN_RECORD_QUERY_KEY } from '@constants/key';
import { API_ERROR_MESSAGE } from '@constants/message';
import useToast from '@hooks/common/useToast';

/**
 * 대출한 도서를 연장합니다.
 */
export function useBookLoanExtendMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: postExtendBook,
    onSuccess: ({ success, errorMessage }, { borrowerId }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: BOOK_LOAN_RECORD_QUERY_KEY.BORROWER(borrowerId),
        });

        toast({
          state: 'success',
          message: '해당 도서 대여 기간을 연장했어요.',
        });
      } else if (errorMessage) {
        toast({
          state: 'error',
          message: API_ERROR_MESSAGE[errorMessage],
        });
      }
    },
  });

  return { bookExtendMutate: mutation.mutate };
}
