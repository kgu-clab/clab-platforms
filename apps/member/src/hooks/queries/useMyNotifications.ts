import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyNotifications } from '@api/notification';
import { QUERY_KEY } from '@constants/key';

/**
 * 나의 알림을 조회합니다.
 */
export const useMyNotifications = (page = 0, size = 20) => {
  return useSuspenseQuery({
    queryFn: () => getMyNotifications(page, size),
    queryKey: [QUERY_KEY.MY_NOTIFICATIONS, page, size],
  });
};
