import { getSchedule } from '@api/schedule';
import { QUERY_KEY } from '@constants/key';
import { DATE_FORMAT } from '@constants/state';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { PaginationPramsType } from '@type/api';
import dayjs from 'dayjs';

interface UseMainScheduleArgs extends PaginationPramsType {
  startDate?: string;
  endDate?: string;
}

// 오늘 날짜와 3개월 후 날짜를 기본값으로 설정
const defaultStartDate = dayjs().format(DATE_FORMAT.WITH_TIME);
const defaultEndDate = dayjs().add(3, 'month').format(DATE_FORMAT.WITH_TIME);

/**
 * 동아리 일정을 조회합니다.
 */
export const useSchedule = ({
  startDate = defaultStartDate,
  endDate = defaultEndDate,
  page = 0,
  size = 62,
}: UseMainScheduleArgs) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.SCHEDULE, startDate, endDate, page, size],
    queryFn: () => getSchedule({ startDate, endDate, page, size }),
  });
};
