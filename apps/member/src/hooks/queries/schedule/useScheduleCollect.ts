import { useSuspenseQuery } from '@tanstack/react-query';

import { getScheduleCollect } from '@api/schedule';
import { SCHEDULE_QUERY_KEY } from '@constants/key';
import { getTime } from '@utils/date';

/**
 * 일정 모아보기를 조회합니다.
 */
export function useScheduleCollect() {
  return useSuspenseQuery({
    queryKey: SCHEDULE_QUERY_KEY.COLLECTS(),
    queryFn: getScheduleCollect,
    staleTime: getTime({ hours: 1 }),
  });
}
