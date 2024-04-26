import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postExtendBook } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 대출한 도서를 연장합니다.
 */
export function useBookLoanExtendMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const bookExtendMutation = useMutation({
    mutationFn: postExtendBook,
    onSuccess: (data, variables) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MY_BOOK, variables.borrowerId],
        });
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEY.BOOK_LOAN_RECORD_CONDITIONS,
            variables.borrowerId,
          ],
        });
        toast({
          state: 'success',
          message: '해당 도서 대여 기간을 연장했어요.',
        });
      } else {
        toast({
          state: 'error',
          message: '도서 대여 연장은 최대 2회까지 가능해요.',
        });
      }
    },
  });

  return { bookExtendMutate: bookExtendMutation.mutate };
}
