import { useSuspenseQuery } from '@tanstack/react-query';

import { getScheduleCollect } from '@api/schedule';
import { QUERY_KEY } from '@constants/key';

/**
 * 일정 모아보기를 조회합니다.
 */
export const useScheduleCollect = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.SCHEDULE_COLLECT],
    queryFn: getScheduleCollect,
  });
};
