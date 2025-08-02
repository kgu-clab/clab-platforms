import { useSuspenseQuery } from '@tanstack/react-query';

import { getMySupports } from '@api/support';
import { SUPPORT_QUERY_KEY } from '@constants/key';

/**
 * 내 문의 목록을 조회합니다.
 */
export function useMySupports({ page = 0, size = 999 }) {
  return useSuspenseQuery({
    queryKey: SUPPORT_QUERY_KEY.MY(),
    queryFn: () => getMySupports({ page, size }),
  });
}
