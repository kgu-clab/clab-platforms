import { BaseResponse, PaginationType } from '@type/api';
import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { ActivityGroupItem, ActivityPhotoItem } from '@type/activity';
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

// 활동 상태별 조회
export const getActivityGroupByStatus = async (
  activityGroupStatus: string,
  page: number,
  size: number,
) => {
  const params = { activityGroupStatus, page, size };
  const { data } = await server.get<PaginationType<ActivityGroupItem>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_MEMBER_STATUS, params),
  });

  return data;
};

// 활동 정보 상세 조회
export const getActivityDetail = async (
  activityGroupId: number,
  category: string,
) => {
  const url =
    category === 'STUDY'
      ? END_POINT.ACTIVITY_GROUP_MEMBER_STUDY(activityGroupId)
      : END_POINT.ACTIVITY_GROUP_MEMBER_PROJECT(activityGroupId);
  const { data } = await server.get<BaseResponse<ActivityGroupItem>>({
    url: url,
  });

  return data;
};

// 활동 ID로 게시물 조회
export const getActivityBoardsById = async (
  activityGroupId: number,
  category: string,
  page: number,
  size: number,
) => {
  const params = { activityGroupId, category, page, size };
  const { data } = await server.get<PaginationType<ActivityGroupItem>>({
    url: createCommonPagination(
      END_POINT.ACTIVITY_GROUP_BOARD_BY_CATRGORY,
      params,
    ),
  });

  return data;
};
