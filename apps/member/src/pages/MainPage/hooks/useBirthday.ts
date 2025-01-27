import { useSuspenseQuery } from '@tanstack/react-query';

import { getBirthday } from '@api/birthday';
import { BIRTHDAY_QUERY_KEY } from '@constants/key';
import { STALE_TIME } from '@constants/state';
import { now } from '@utils/date';

import { WithPaginationParams } from '@type/api';

interface Params extends WithPaginationParams {
  month?: number;
}

/**
 * 월 별 생일자를 조회합니다.
 */
export function useBirthday({
  month = now().get('M') + 1,
  page = 0,
  size = 99,
}: Params = {}) {
  return useSuspenseQuery({
    queryKey: BIRTHDAY_QUERY_KEY.MONTH(month),
    queryFn: () => getBirthday(month, page, size),
    staleTime: STALE_TIME.LONG,
  });
}
