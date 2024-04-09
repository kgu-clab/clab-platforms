import { getScheduleCollect } from '@api/schedule';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

/**
 * 일정 모아보기를 조회합니다.
 */
export const useScheduleCollect = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.SCHEDULE_COLLECT],
    queryFn: getScheduleCollect,
  });
};
