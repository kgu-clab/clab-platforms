import { getMyBooks } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
import profile from '@mocks/data/profile.json';

export const useMyBookLoan = (page = 0, size = 20) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.BOOK_LIST, page, size],
    queryFn: () => getMyBooks(page, size, profile.id),
  });
};
