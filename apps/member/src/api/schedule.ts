import { END_POINT } from '@constants/api';
import { createCommonPagination, createPath } from '@utils/api';
import { toKoreaISOString } from '@utils/date';

import type {
  BaseResponse,
  PaginationType,
  WithPaginationParams,
} from '@type/api';
import type {
  ScheduleCollect,
  ScheduleItem,
  ScheduleRegisterItem,
} from '@type/schedule';

import { server } from './server';

interface GetScheduleParams extends WithPaginationParams {
  startDate: string;
  endDate: string;
  page: number;
  size: number;
}
/**
 * 일정 조회
 */
export const getSchedule = async ({
  startDate,
  endDate,
  page,
  size,
}: GetScheduleParams) => {
  const params = { startDate, endDate, page, size };
  const { data } = await server.get<PaginationType<ScheduleItem>>({
    url: createCommonPagination(END_POINT.MAIN_SCHEDULE, params),
  });

  return data;
};
/**
 * 일정 모아보기
 */
export const getScheduleCollect = async () => {
  const { data } = await server.get<BaseResponse<ScheduleCollect>>({
    url: END_POINT.SCHEDULE_COLLECT,
  });

  return data;
};
/**
 * 일정 등록
 */
export const postSchedule = async (body: ScheduleRegisterItem) => {
  const { data } = await server.post<
    ScheduleRegisterItem,
    BaseResponse<number>
  >({
    url: END_POINT.MAIN_SCHEDULE,
    body: {
      ...body,
      startDateTime: toKoreaISOString(body.startDateTime),
      endDateTime: toKoreaISOString(body.endDateTime),
    },
  });

  return data;
};
/**
 * 일정 삭제
 */
export const deleteSchedule = async (id: number) => {
  const { data } = await server.del<unknown, BaseResponse<number>>({
    url: createPath(END_POINT.MAIN_SCHEDULE, id),
  });

  return data;
};
