import { postReturnBook } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useBookLoanReturnMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const bookReturnMutation = useMutation({
    mutationFn: postReturnBook,
    onSuccess: (res) => {
      if (!res) {
        toast({
          state: 'error',
          message: '반납에 실패했습니다.',
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_LOAN_RECORD],
        });
        toast({
          state: 'success',
          message: '반납 되었습니다.',
        });
      }
    },
  });

  return { bookReturnMutate: bookReturnMutation.mutate };
};
