import { useSuspenseQuery } from '@tanstack/react-query';

import { getBoardsHot } from '@api/board';
import { BOARD_QUERY_KEY } from '@constants/key';

interface Params {
  strategyName?: string;
}

/**
 * 커뮤니티 인기 게시글을 조회합니다.
 */
export function useBoardByHot({ strategyName = 'DEFAULT' }: Params = {}) {
  return useSuspenseQuery({
    queryKey: BOARD_QUERY_KEY.HOT(strategyName),
    queryFn: () => getBoardsHot(strategyName),
  });
}
