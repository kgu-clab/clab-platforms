import { getBookDetail } from '@api/book';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useBookDetails = (id = '0') => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.BOOK_DETAIL, id],
    queryFn: () => getBookDetail(id),
  });
};
