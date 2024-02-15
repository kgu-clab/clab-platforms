import { getSchedule } from '@api/schedule';
import { QUERY_KEY } from '@constants/key';
import { DATE_FORMAT } from '@constants/state';
import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

interface UseMainScheduleArgs {
  start?: string;
  end?: string;
  page?: number;
  size?: number;
}

// 오늘 날짜와 3개월 후 날짜를 기본값으로 설정
const defaultStartDate = dayjs().format(DATE_FORMAT.WITH_TIME);
const defaultEndDate = dayjs().add(3, 'month').format(DATE_FORMAT.WITH_TIME);

export const useSchedule = ({
  start = defaultStartDate,
  end = defaultEndDate,
  page = 0,
  size = 10,
}: UseMainScheduleArgs) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.SCHEDULE, start, end, page, size],
    queryFn: () => getSchedule(start, end, page, size),
  });
};
