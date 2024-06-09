import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyNotifications } from '@api/notification';
import { NOTIFICATION_QUERY_KEY } from '@constants/key';
import { getTime } from '@utils/date';

import type { WithPaginationParams } from '@type/api';

/**
 * 나의 알림을 조회합니다.
 */
export const useMyNotifications = ({
  page = 0,
  size = 10,
}: WithPaginationParams = {}) => {
  return useSuspenseQuery({
    queryKey: NOTIFICATION_QUERY_KEY.NOTIFICATIONS(),
    queryFn: () => getMyNotifications(page, size),
    refetchInterval: getTime({
      minutes: 3,
    }),
  });
};
