import { BaseResponse, PaginationType } from '@type/api';
import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type {
  ActivityApplierType,
  ActivityBoardType,
  ActivityGroupItem,
  ActivityGroupMemberType,
  ActivityPhotoItem,
  ActivityRequestType,
} from '@type/activity';
import type { ScheduleItem } from '@type/schedule';

interface patchActivityGroupMemberApplyArgs {
  memberId: string;
  status: string;
}

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
  const { data } = await server.get<PaginationType<ActivityBoardType>>({
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
  const { data: formData } = await server.post<
    ActivityRequestType,
    BaseResponse<number>
  >({
    url: END_POINT.ACTIVITY_GROUP_MEMBER_APPLY_FORM,
    body,
  });
  formData &&
    body.activityGroupId &&
    (await server.post<number, BaseResponse<number>>({
      url: createCommonPagination(END_POINT.ACTIVITY_GROUP_MEMBER_APPLY, {
        activityGroupId: body.activityGroupId,
      }),
    }));
  return formData;
};

// 부모 게시판 id로 자식 게시판 조회
export const getActivityBoardLayer = async (
  parentId: number,
  page: number,
  size: number,
) => {
  const params = {
    parentId,
    page,
    size,
  };
  const { data } = await server.get<PaginationType<ActivityBoardType>>({
    url: createCommonPagination(
      END_POINT.ACTIVITY_GROUP_BOARD_BY_PARENT,
      params,
    ),
  });

  return data;
};

// 활동 멤버 조회
export const getActivityGroupMember = async (
  activityGroupId: number,
  page: number,
  size: number,
) => {
  const params = { activityGroupId, page, size };
  const { data } = await server.get<PaginationType<ActivityGroupMemberType>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_MEMBER, params),
  });

  return data;
};

// 신청 멤버 조회
export const getActivityGroupApplyMember = async (
  activityGroupId: number,
  page: number,
  size: number,
) => {
  const params = { activityGroupId, page, size };
  const { data } = await server.get<PaginationType<ActivityRequestType>>({
    url: createCommonPagination(
      END_POINT.ACTIVITY_GROUP_ADMIN_APPLY_FORMS,
      params,
    ),
  });

  return data;
};

// 활동 신청 수락
export const patchActivityGroupMemberApply = async ({
  memberId,
  status,
}: patchActivityGroupMemberApplyArgs) => {
  const params = { memberId, status };
  const { data } = await server.patch<
    ActivityRequestType,
    BaseResponse<string>
  >({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_ADMIN_ACCEPT, params),
  });

  return data;
};
