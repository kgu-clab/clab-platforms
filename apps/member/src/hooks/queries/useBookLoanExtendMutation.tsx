import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postExtendBook } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 대출한 도서를 연장합니다.
 */
export const useBookLoanExtendMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const bookExtendMutation = useMutation({
    mutationFn: postExtendBook,
    onSuccess: ({ memberId, bookId }) => {
      if (bookId) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_LOAN_RECORD, memberId],
        });
        toast({
          state: 'success',
          message: '성공적으로 연장되었습니다.',
        });
      } else {
        toast({
          state: 'error',
          message: '연장에 실패했습니다.',
        });
      }
    },
  });

  return { bookExtendMutate: bookExtendMutation.mutate };
};
