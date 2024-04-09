import { getSchedule } from '@api/schedule';
import { QUERY_KEY } from '@constants/key';
import { DATE_FORMAT } from '@constants/state';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { WithPaginationPrams } from '@type/api';
import dayjs from 'dayjs';

interface UseMainSchedulePrams extends WithPaginationPrams {
  startDate?: string;
  endDate?: string;
}

// 이번달을 기본값으로 설정
const defaultStartDate = dayjs().startOf('month').format(DATE_FORMAT.WITH_TIME);
const defaultEndDate = dayjs().endOf('month').format(DATE_FORMAT.WITH_TIME);

/**
 * 동아리 일정을 조회합니다.
 */
export const useSchedule = ({
  startDate = defaultStartDate,
  endDate = defaultEndDate,
  page = 0,
  size = 100,
}: UseMainSchedulePrams = {}) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.SCHEDULE, startDate, endDate],
    queryFn: () => getSchedule({ startDate, endDate, page, size }),
  });
};
