import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyHire } from '@api/hire';
import { HIRE_QUERY_KEY } from '@constants/key';

import type { WithPaginationParams } from '@type/api';

/**
 * 채용 정보를 조회합니다.
 */
export function useHire({ page = 0, size = 6 }: WithPaginationParams = {}) {
  return useSuspenseQuery({
    queryKey: HIRE_QUERY_KEY.PAGE({ page, size }),
    queryFn: () => getMyHire(page, size),
  });
}
