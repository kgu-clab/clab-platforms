import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyActivities } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import { getTime, now } from '@utils/date';

import type { WithPaginationParams } from '@type/api';

interface UseMyActivityParams extends WithPaginationParams {
  startDate?: string;
  endDate?: string;
}

/**
 * 내 활동을 조회합니다. (최근 6개월)
 */
export const useMyActivity = ({
  startDate = now().format('YYYY-MM-DD'),
  endDate = now().add(6, 'month').format('YYYY-MM-DD'),
  page = 0,
  size = 20,
}: UseMyActivityParams = {}) => {
  return useSuspenseQuery({
    queryFn: () => getMyActivities(startDate, endDate, page, size),
    queryKey: ACTIVITY_QUERY_KEY.MY(),
    staleTime: getTime(0, 10, 0),
  });
};
