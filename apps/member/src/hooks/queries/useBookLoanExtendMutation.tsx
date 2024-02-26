import { postExtendBook } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useBookLoanExtendMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const bookExtendMutation = useMutation({
    mutationFn: postExtendBook,
    onSuccess: (res) => {
      if (!res) {
        toast({
          state: 'error',
          message: '연장에 실패했습니다.',
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.BOOK_LOAN_RECORD],
        });
        toast({
          state: 'success',
          message: '연장 되었습니다.',
        });
      }
    },
  });

  return { bookExtendMutate: bookExtendMutation.mutate };
};
