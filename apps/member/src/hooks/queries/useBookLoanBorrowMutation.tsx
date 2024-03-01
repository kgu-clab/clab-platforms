import { postBorrowBook } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useBookLoanBorrowMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const bookBorrowMutation = useMutation({
    mutationFn: postBorrowBook,
    onSuccess: (res) => {
      if (!res) {
        toast({
          state: 'error',
          message: '도서 대출에 실패했습니다.',
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_LOAN_RECORD],
        });
        toast({
          state: 'success',
          message: '대출 되었습니다.',
        });
      }
    },
  });

  return { bookBorrowMutate: bookBorrowMutation.mutate };
};
