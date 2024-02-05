import { getMyBoards } from '@api/board';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useMyBoards = (page = 0, size = 20) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MY_BOARDS, page, size],
    queryFn: () => getMyBoards(page, size),
  });
};
