import { getMyActivities } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS');
const endDay = dayjs().add(6, 'month').format('YYYY-MM-DDTHH:mm:ss.SSS');

export const useMyActivity = (
  startDateTime = String(today),
  endDateTime = String(endDay),
  page = 0,
  size = 20,
) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MY_ACTIVITY, startDateTime, endDateTime, page, size],
    queryFn: () => getMyActivities(startDateTime, endDateTime, page, size),
  });
};
