import { PaginationType } from '@type/api';
import { server } from './server';
import { END_POINT } from '@constants/api';
import { createSchedulePagination } from '@utils/api';
import { ScheduleItem } from '@type/schedule';

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
