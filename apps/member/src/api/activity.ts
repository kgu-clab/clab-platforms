import { BaseResponse, PaginationType } from '@type/api';
import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type {
  ActivityBoardType,
  ActivityGroupDetailType,
  ActivityGroupItem,
  ActivityGroupMemberType,
  ActivityGroupStatusType,
  ActivityPhotoItem,
  ActivityRequestType,
  SubmitBoardType,
} from '@type/activity';
import type { ScheduleItem } from '@type/schedule';

interface patchActivityGroupMemberApplyArgs {
  activityGroupId: number;
  memberId: string;
  status: string;
}

interface PatchActivityBoardArgs {
  activityGroupBoardId: number;
  body: SubmitBoardType;
}

interface PostActivityGroupMemberApplyArgs {
  activityGroupId: number;
  body: ActivityRequestType;
}

interface PostActivityBoardArgs {
  parentId?: number;
  activityGroupId: number;
  body: SubmitBoardType;
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
  activityGroupStatus: ActivityGroupStatusType,
  page: number,
  size: number,
) => {
  const params = { activityGroupStatus, page, size };
  const { data } = await server.get<PaginationType<ActivityGroupItem>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_MEMBER_STATUS, params),
  });

  return data;
};

// 활동 상세 조회
export const getActivityGroupDetail = async (id: string) => {
  const { data } = await server.get<BaseResponse<ActivityGroupDetailType>>({
    url: END_POINT.ACTIVITY_GROUP_MEMBER(id),
  });

  return data;
};

// 활동 신청
export const postActivityGroupMemberApply = async ({
  activityGroupId,
  body,
}: PostActivityGroupMemberApplyArgs) => {
  const params = { activityGroupId };
  const { data } = await server.post<ActivityRequestType, BaseResponse<number>>(
    {
      url: createCommonPagination(
        END_POINT.ACTIVITY_GROUP_MEMBER_APPLY,
        params,
      ),
      body,
    },
  );

  return data;
};

// 활동 멤버 조회
export const getActivityGroupMember = async (
  activityGroupId: string,
  page: number,
  size: number,
) => {
  const params = { activityGroupId, page, size };
  const { data } = await server.get<PaginationType<ActivityGroupMemberType>>({
    url: createCommonPagination(
      END_POINT.ACTIVITY_GROUP_MEMBER_MEMBERS,
      params,
    ),
  });

  return data;
};

// 신청 멤버 조회
export const getActivityGroupApplyByStatus = async (
  activityGroupId: number,
  status: string,
  page: number,
  size: number,
) => {
  const params = { activityGroupId, status, page, size };
  const { data } = await server.get<PaginationType<ActivityGroupMemberType>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_ADMIN_MEMBERS, params),
  });

  return data;
};

// 활동 신청 상태
export const patchActivityGroupMemberApply = async ({
  activityGroupId,
  memberId,
  status,
}: patchActivityGroupMemberApplyArgs) => {
  const params = { activityGroupId, memberId, status };
  const { data } = await server.patch<unknown, BaseResponse<string>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_ADMIN_ACCEPT, params),
  });

  return data;
};

// 게시판 단일 조회
export const getActivityBoard = async (activityGroupBoardId: string) => {
  const params = {
    activityGroupBoardId,
  };
  const { data } = await server.get<BaseResponse<ActivityBoardType>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_BOARDS, params),
  });

  return data;
};

// 과제 제출 조회
export const getActivityBoardsMyAssignment = async (parentId: string) => {
  const params = {
    parentId,
  };
  const { data } = await server.get<BaseResponse<ActivityBoardType>>({
    url: createCommonPagination(
      END_POINT.ACTIVITY_GROUP_BOARDS_MY_ASSIGNMENT,
      params,
    ),
  });

  return data;
};

// 게시글 수정
export const patchActivityBoard = async ({
  activityGroupBoardId,
  body,
}: PatchActivityBoardArgs) => {
  const params = { activityGroupBoardId };
  const { data } = await server.patch<SubmitBoardType, BaseResponse<number>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_BOARDS, params),
    body,
  });

  return data;
};

// 게시물 작성
export const postActivityBoard = async ({
  parentId,
  activityGroupId,
  body,
}: PostActivityBoardArgs) => {
  let params;
  if (parentId) {
    params = { parentId, activityGroupId };
  } else {
    params = { activityGroupId };
  }
  const { data: formData } = await server.post<
    SubmitBoardType,
    BaseResponse<number>
  >({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_BOARD, params),
    body,
  });
  return formData;
};

// 제출 게시판 피드백 조회
export const getActivityBoardsFeedback = async (parentId: number) => {
  const { data } = await server.get<BaseResponse<ActivityBoardType>>({
    url: END_POINT.ACTIVITY_GROUP_BOARD_FEEDBACK(parentId),
  });

  return data;
};
