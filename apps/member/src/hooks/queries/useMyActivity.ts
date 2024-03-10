import { getMyActivities } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS');
const endDay = dayjs().add(6, 'month').format('YYYY-MM-DDTHH:mm:ss.SSS');

/**
 * 내 활동을 조회합니다. (최근 6개월)
 */
export const useMyActivity = (
  startDateTime = String(today),
  endDateTime = String(endDay),
  page = 0,
  size = 20,
) => {
  return useSuspenseQuery({
    queryFn: () => getMyActivities(startDateTime, endDateTime, page, size),
    queryKey: [QUERY_KEY.MY_ACTIVITY, startDateTime, endDateTime, page, size],
  });
};
