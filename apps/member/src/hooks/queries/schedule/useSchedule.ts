import { useSuspenseQuery } from '@tanstack/react-query';

import { getSchedule } from '@api/schedule';
import { SCHEDULE_QUERY_KEY } from '@constants/key';
import { DATE_FORMAT } from '@constants/state';
import { getTime } from '@utils/date';
import dayjs from 'dayjs';

import type { WithPaginationParams } from '@type/api';

interface UseMainSchedulePrams extends WithPaginationParams {
  startDate?: string;
  endDate?: string;
}

/**
 * 동아리 일정을 조회합니다.
 */
export function useSchedule({
  startDate = dayjs().startOf('month').toString(),
  endDate = dayjs().endOf('month').toString(),
  page = 0,
  size = 200,
}: UseMainSchedulePrams = {}) {
  const formattedStartDate = dayjs(startDate).format(DATE_FORMAT.WITH_TIME);
  const formattedEndDate = dayjs(endDate).format(DATE_FORMAT.WITH_TIME);

  return useSuspenseQuery({
    queryKey: SCHEDULE_QUERY_KEY.MONTH(formattedStartDate, formattedEndDate),
    queryFn: () =>
      getSchedule({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        page,
        size,
      }),
    staleTime: getTime({ hours: 1 }),
    gcTime: getTime({ hours: 2 }),
  });
}
