import { useSuspenseQuery } from '@tanstack/react-query';

import { getSupportList } from '@api/support';
import { SUPPORT_QUERY_KEY } from '@constants/key';

/**
 * 문의 목록을 조회합니다.
 */
export function useSupportList({ page = 0, size = 20 }) {
  return useSuspenseQuery({
    queryKey: SUPPORT_QUERY_KEY.COLLECTION({ page, size }),
    queryFn: () => getSupportList({ page, size }),
  });
}
