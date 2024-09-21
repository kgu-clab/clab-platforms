import { createPagination } from '@clab-platforms/utils';

import { END_POINT } from '@constants/api';

import type { ResponsePagination } from '@type/api';

import { server } from './server';

export interface Notification {
  id: number;
  content: string;
  createdAt: string;
}

/**
 * 내 알림을 조회합니다.
 */
export const getMyNotifications = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<ResponsePagination<Notification>>({
    url: createPagination(END_POINT.MY_NOTIFICATION, params),
  });

  return data;
};
