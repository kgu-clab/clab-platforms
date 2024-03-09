import { postReturnBook } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * 대출한 도서를 반납합니다.
 */
export const useBookLoanReturnMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const bookReturnMutation = useMutation({
    mutationFn: postReturnBook,
    onSuccess: ({ memberId, bookId, data }) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_DETAIL, bookId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_LOAN_RECORD, memberId],
        });
        toast({
          state: 'success',
          message: '정상적으로 반납이 되었습니다.',
        });
      } else {
        toast({
          state: 'error',
          message: '반납에 실패했습니다.',
        });
      }
    },
  });

  return { bookReturnMutate: bookReturnMutation.mutate };
};
