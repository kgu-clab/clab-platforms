import { PaginationType } from '@type/api';
import { server } from './server';
import { createPagination, createSchedulePagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import { ActivityPhotoItem } from '@type/activity';
import { ScheduleItem } from '@type/schedule';

// 나의 활동 일정 조회
export const getMyActivities = async (
  startDateTime: string,
  endDateTime: string,
  page: number,
  size: number,
) => {
  const { data } = await server.get<PaginationType<ScheduleItem>>({
    url: createSchedulePagination(
      END_POINT.MY_ACTIVITY,
      startDateTime,
      endDateTime,
      page,
      size,
    ),
  });

  return data;
};

//활동 사진 조회
export const getActivityPhoto = async (page: number, size: number) => {
  const { data } = await server.get<PaginationType<ActivityPhotoItem>>({
    url: createPagination(END_POINT.MAIN_ACTIVITY_PHOTO, page, size),
  });

  return data;
};
