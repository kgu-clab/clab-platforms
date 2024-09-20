import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyNotifications } from '@api/notification';
import { NOTIFICATION_QUERY_KEY } from '@constants/key';
import { getTime } from '@utils/date';

import type { WithPaginationParams } from '@type/api';

export interface UseMyNotificationsOptions extends WithPaginationParams {}

/**
 * 나의 알림을 조회합니다.
 */
export function useMyNotifications({
  page = 0,
  size = 10,
}: UseMyNotificationsOptions = {}) {
  return useSuspenseQuery({
    queryKey: NOTIFICATION_QUERY_KEY.MY(),
    queryFn: () => getMyNotifications(page, size),
    refetchInterval: getTime({ minutes: 3 }), // 폴링으로 3분마다 최신화 합니다.
  });
}
