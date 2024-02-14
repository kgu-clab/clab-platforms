import { PaginationType } from '@type/api';
import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { ActivityPhotoItem } from '@type/activity';
import type { ScheduleItem } from '@type/schedule';

// 나의 활동 일정 조회
export const getMyActivities = async (
  startDateTime: string,
  endDateTime: string,
  page: number,
  size: number,
) => {
  const params = {
    startDateTime,
    endDateTime,
    page,
    size,
  };
  const { data } = await server.get<PaginationType<ScheduleItem>>({
    url: createCommonPagination(END_POINT.MY_ACTIVITY, params),
  });

  return data;
};

//활동 사진 조회
export const getActivityPhoto = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<ActivityPhotoItem>>({
    url: createCommonPagination(END_POINT.MAIN_ACTIVITY_PHOTO, params),
  });

  return data;
};
