import { useSuspenseQuery } from '@tanstack/react-query';

import { getBoardHashtagsList } from '@api/board';
import { BOARD_QUERY_KEY } from '@constants/key';

import type { WithPaginationParams } from '@type/api';

interface Params extends WithPaginationParams {
  hashtags: Array<string>;
}
/**
 * 커뮤니티 게시글을 해시태그로 조회합니다.
 */
export function useBoardByHashtag({ hashtags, page = 0, size = 20 }: Params) {
  return useSuspenseQuery({
    queryKey: BOARD_QUERY_KEY.HASHTAG_PAGE(hashtags, { page, size }),
    queryFn: () => getBoardHashtagsList(hashtags, page, size),
  });
}
