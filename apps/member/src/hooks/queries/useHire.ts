import { getMyHire } from '@api/hire';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useHire = (page = 0, size = 6) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.HIRE, page, size],
    queryFn: () => getMyHire(page, size),
  });
};
