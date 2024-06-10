import { END_POINT } from '@constants/api';
import { createCommonPagination, createPath } from '@utils/api';
import { toKoreaISOString } from '@utils/date';

import type {
  BaseResponse,
  PaginationType,
  ResponsePagination,
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
export async function getSchedule({
  startDate,
  endDate,
  page,
  size,
}: GetScheduleParams) {
  const params = { startDate, endDate, page, size };
  const { data } = await server.get<PaginationType<ScheduleItem>>({
    url: createCommonPagination(END_POINT.MAIN_SCHEDULE, params),
  });

  return data;
}
/**
 * 일정 모아보기
 */
export async function getScheduleCollect() {
  const { data } = await server.get<BaseResponse<ScheduleCollect>>({
    url: END_POINT.SCHEDULE_COLLECT,
  });

  return data;
}
/**
 * 일정 등록
 */
export async function postSchedule(body: ScheduleRegisterItem) {
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
}
/**
 * 일정 삭제
 */
export async function deleteSchedule(id: number) {
  const { data } = await server.del<unknown, BaseResponse<number>>({
    url: createPath(END_POINT.MAIN_SCHEDULE, id),
  });

  return data;
}

/**
 * 나의 활동 일정 조회
 */
export async function getMyActivitySchedule(
  startDate: string,
  endDate: string,
  page: number,
  size: number,
) {
  const { data } = await server.get<ResponsePagination<ScheduleItem>>({
    url: createCommonPagination(END_POINT.MY_ACTIVITY, {
      startDate,
      endDate,
      page,
      size,
    }),
  });

  return data;
}
