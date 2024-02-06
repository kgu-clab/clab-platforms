import { getSchedule } from '@api/schedule';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS');
const endDay = dayjs().add(6, 'month').format('YYYY-MM-DDTHH:mm:ss.SSS');

export const useMainSchedule = (
  startDateTime = String(today),
  endDateTime = String(endDay),
  page = 0,
  size = 5,
) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MAIN_SCHEDULE, startDateTime, endDateTime, page, size],
    queryFn: () => getSchedule(startDateTime, endDateTime, page, size),
  });
};
