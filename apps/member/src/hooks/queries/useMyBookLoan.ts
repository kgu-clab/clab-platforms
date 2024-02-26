import { getMyBooks } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useMyBookLoan = (page = 0, size = 20, id: string) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MY_BOOK_LIST, page, size],
    queryFn: () => getMyBooks(page, size, id),
  });
};
