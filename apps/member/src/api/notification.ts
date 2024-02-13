import { PaginationType } from '@type/api';
import { server } from './server';
import type { NotificationItem } from '@type/notification';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';

// 나의 알림 조회
export const getMyNotifications = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<NotificationItem>>({
    url: createCommonPagination(END_POINT.MY_NOTIFICATION, params),
  });

  return data;
};
