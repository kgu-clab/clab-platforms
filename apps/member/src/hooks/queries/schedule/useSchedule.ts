import { useSuspenseQuery } from '@tanstack/react-query';

import { getSchedule } from '@api/schedule';
import { SCHEDULE_QUERY_KEY } from '@constants/key';
import { DATE_FORMAT, STALE_TIME } from '@constants/state';
import dayjs from 'dayjs';

import type { WithPaginationParams, WithPermissionParams } from '@type/api';

interface Params extends WithPaginationParams, WithPermissionParams {
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
  hasPermission,
}: Params = {}) {
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
    staleTime: hasPermission ? STALE_TIME.ALWAYS : STALE_TIME.LONG,
  });
}
