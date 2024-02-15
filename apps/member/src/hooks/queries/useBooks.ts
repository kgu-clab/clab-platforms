import { getBooks } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useBooks = (page = 0, size = 6) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.BOOK, page, size],
    queryFn: () => getBooks(page, size),
  });
};
