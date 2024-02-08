import { BaseResponse, PaginationType } from '@type/api';
import { server } from './server';
import { END_POINT } from '@constants/api';
import { createSchedulePagination } from '@utils/api';
import type { ScheduleItem, ScheduleRegisterItem } from '@type/schedule';

// 일정 조회
export const getSchedule = async (
  startDateTime: string,
  endDateTime: string,
  page: number,
  size: number,
) => {
  const { data } = await server.get<PaginationType<ScheduleItem>>({
    url: createSchedulePagination(
      END_POINT.MAIN_SCHEDULE,
      startDateTime,
      endDateTime,
      page,
      size,
    ),
  });
  return data;
};

// 일정 추가
export const postSchedule = async (requestBody: ScheduleRegisterItem) => {
  console.log(requestBody);
  const jsonRequestBody = JSON.stringify(requestBody);
  const { data } = await server.post<string, BaseResponse<number>>({
    url: END_POINT.MAIN_SCHEDULE,
    body: jsonRequestBody,
  });
  return data;
};
