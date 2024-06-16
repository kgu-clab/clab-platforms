import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyActivitySchedule } from '@api/schedule';
import { SCHEDULE_QUERY_KEY } from '@constants/key';
import { STALE_TIME } from '@constants/state';
import { now } from '@utils/date';

import type { WithPaginationParams } from '@type/api';

interface Params extends WithPaginationParams {
  startDate?: string;
  endDate?: string;
}

/**
 * 내 활동의 일정을 조회합니다. (최근 6개월)
 */
export function useMyActivitySchedule({
  startDate = now().format('YYYY-MM-DD'),
  endDate = now().add(6, 'month').format('YYYY-MM-DD'),
  page = 0,
  size = 20,
}: Params = {}) {
  return useSuspenseQuery({
    queryKey: SCHEDULE_QUERY_KEY.ACTIVITIES(),
    queryFn: () => getMyActivitySchedule(startDate, endDate, page, size),
    staleTime: STALE_TIME.LONG,
  });
}
