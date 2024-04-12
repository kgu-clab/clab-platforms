import { useSuspenseQuery } from '@tanstack/react-query';

import { getBooks } from '@api/book';
import { QUERY_KEY } from '@constants/key';

export const useBooks = (page = 0, size = 6) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.BOOK, page, size],
    queryFn: () => getBooks(page, size),
  });
};
