import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';

import { PaginationType } from '@type/api';
import type { NotificationItem } from '@type/notification';

import { server } from './server';

// 나의 알림 조회
export const getMyNotifications = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<NotificationItem>>({
    url: createCommonPagination(END_POINT.MY_NOTIFICATION, params),
  });

  return data;
};
