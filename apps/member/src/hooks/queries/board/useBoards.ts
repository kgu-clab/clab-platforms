import { useSuspenseQuery } from '@tanstack/react-query';

import { getBoards } from '@api/board';
import { QUERY_KEY } from '@constants/key';

import type { WithPaginationParams } from '@type/api';

/**
 * 커뮤니티 게시글 목록을 조회합니다.
 * 카테고리별로 조회하려면 useCategoryBoards를 사용하세요리
 */
export const useBoards = ({ page = 0, size = 20 }: WithPaginationParams) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.BOARDS, { page, size }],
    queryFn: () => getBoards(page, size),
  });
};
