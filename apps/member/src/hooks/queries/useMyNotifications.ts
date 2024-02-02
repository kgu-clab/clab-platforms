import { getMyNotifications } from '@api/notification';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useMyNotifications = (page = 0, size = 20) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MY_NOTIFICATIONS, page, size],
    queryFn: () => getMyNotifications(page, size),
  });
};
