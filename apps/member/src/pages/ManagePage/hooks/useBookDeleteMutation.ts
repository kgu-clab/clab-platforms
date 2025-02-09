import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBook } from '@api/book';
import { BOOK_QUERY_KEY } from '@constants/key';
import useToast from '@hooks/common/useToast';

/**
 * 도서를 삭제합니다.
 */
export function useBookDeleteMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: (data) => {
      if (!data) {
        return toast({
          state: 'error',
          message: '도서 삭제에 실패했어요.',
        });
      } else {
        queryClient.invalidateQueries({ queryKey: BOOK_QUERY_KEY.ALL });

        toast({
          state: 'success',
          message: '도서가 삭제됐어요.',
        });
      }
    },
  });

  return {
    bookDeleteMutate: mutation.mutate,
    bookDeleteIsPending: mutation.isPending,
  };
}
