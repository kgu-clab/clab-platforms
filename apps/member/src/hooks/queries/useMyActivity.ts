import { getMyActivities } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { now } from '@utils/date';

/**
 * 내 활동을 조회합니다. (최근 6개월)
 */
export const useMyActivity = (
  startDate = now().format('YYYY-MM-DD'),
  endDate = now().add(6, 'month').format('YYYY-MM-DD'),
  page = 0,
  size = 20,
) => {
  return useSuspenseQuery({
    queryFn: () => getMyActivities(startDate, endDate, page, size),
    queryKey: [QUERY_KEY.MY_ACTIVITY, startDate, endDate, page, size],
  });
};
