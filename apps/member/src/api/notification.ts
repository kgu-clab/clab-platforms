import { createPagination } from '@clab-platforms/utils';

import { END_POINT } from '@constants/api';

import type { ResponsePagination } from '@type/api';
import type { NotificationItem } from '@type/notification';

import { server } from './server';

/**
 * 내 알림을 조회합니다.
 */
export const getMyNotifications = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<ResponsePagination<NotificationItem>>({
    url: createPagination(END_POINT.MY_NOTIFICATION, params),
  });

  return data;
};
