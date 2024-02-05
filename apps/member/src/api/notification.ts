import { PaginationType } from '@type/api';
import { server } from './server';
import type { NotificationItem } from '@type/notification';
import { createPagination } from '@utils/api';
import { END_POINT } from '@constants/api';

// 나의 알림 조회
export const getMyNotifications = async (page: number, size: number) => {
  const { data } = await server.get<PaginationType<NotificationItem>>({
    url: createPagination(END_POINT.MY_NOTIFICATION, page, size),
  });

  return data;
};
