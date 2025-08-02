import { useSuspenseQuery } from '@tanstack/react-query';

import { getSupports } from '@api/support';
import { SUPPORT_QUERY_KEY } from '@constants/key';

/**
 * 문의 목록을 조회합니다.
 */
export function useSupports({ page = 0, size = 20 }) {
  return useSuspenseQuery({
    queryKey: SUPPORT_QUERY_KEY.COLLECTION({ page, size }),
    queryFn: () => getSupports({ page, size }),
  });
}
