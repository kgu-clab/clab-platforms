import { BaseResponse, PaginationType } from '@type/api';
import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type {
  ActivityApplierType,
  ActivityGroupItem,
  ActivityPhotoItem,
  ActivityRequestType,
} from '@type/activity';
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

// 신청자 정보
export const getActivityApplierInfo = async () => {
  const { data } = await server.get<BaseResponse<ActivityApplierType>>({
    url: END_POINT.ACTIVITY_GROUP_MEMBER_APPLIER,
  });

  return data;
};

// 활동 신청
export const postActivityGroupMemberApply = async (
  body: ActivityRequestType,
) => {
  const params = {
    activityGroupId: body.activityGroupId,
  };
  const { data: formData } = await server.post<
    ActivityRequestType,
    BaseResponse<number>
  >({
    url: END_POINT.ACTIVITY_GROUP_MEMBER_APPLY_FORM,
    body,
  });
  if (formData) {
    await server.post<number, BaseResponse<number>>({
      url: createCommonPagination(
        END_POINT.ACTIVITY_GROUP_MEMBER_APPLY,
        params,
      ),
    });
  }
  return formData;
};
