import { END_POINT } from '@constants/api';
import { createCommonPagination, createFormData } from '@utils/api';
import { groupBoardParser } from '@utils/group';

import type {
  ActivityApplyMemberType,
  ActivityBoardType,
  ActivityGroupBoardParserType,
  ActivityGroupItem,
  ActivityGroupMemberMyType,
  ActivityGroupStatusType,
  ActivityPhotoItem,
  ActivityPhotosBody,
  ActivityRequestType,
  SubmitBoardType,
} from '@type/activity';
import type { BaseResponse, IDType, PaginationType } from '@type/api';
import type { ScheduleItem } from '@type/schedule';

import { server } from './server';
import {
  postFilesActivityPhotos,
  postUploadedFileAssignment,
} from './uploadedFile';

export interface PatchActivityGroupMemberApplyPrams {
  activityGroupId: number;
  memberId: string;
  status: string;
}

export interface PostActivityGroupMemberApplyPrams {
  activityGroupId: number;
  body: ActivityRequestType;
}

export interface PostActivityBoardPrams {
  activityGroupId: number;
  body: SubmitBoardType;
  parentId?: number;
  memberId?: string;
  files?: FormData;
}

export interface PatchActivityBoardPrams {
  activityGroupBoardId: IDType;
  groupId: IDType;
  groupBoardId: IDType;
  body: SubmitBoardType;
  files?: FormData;
}

export interface PostActivityPhotoPrams {
  title: string;
  date: string;
  file: File;
}

/**
 * 나의 활동 일정 조회
 */
export const getMyActivities = async (
  startDate: string,
  endDate: string,
  page: number,
  size: number,
) => {
  const { data } = await server.get<PaginationType<ScheduleItem>>({
    url: createCommonPagination(END_POINT.MY_ACTIVITY, {
      startDate,
      endDate,
      page,
      size,
    }),
  });

  return data;
};
/**
 * 활동 사진 조회
 */
export const getActivityPhoto = async (page: number, size: number) => {
  const { data } = await server.get<PaginationType<ActivityPhotoItem>>({
    url: createCommonPagination(END_POINT.MAIN_ACTIVITY_PHOTO, { page, size }),
  });

  return data;
};
/**
 * 활동 상태별 조회
 */
export const getActivityGroupByStatus = async (
  activityGroupStatus: ActivityGroupStatusType,
  page: number,
  size: number,
) => {
  const { data } = await server.get<PaginationType<ActivityGroupItem>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_MEMBER_STATUS, {
      activityGroupStatus,
      page,
      size,
    }),
  });

  return data;
};
/**
 * 활동 상세 조회
 */
export const getActivityGroupDetail = async (id: number) => {
  const { data } = await server.get<BaseResponse<ActivityGroupBoardParserType>>(
    {
      url: END_POINT.ACTIVITY_GROUP_MEMBER(id),
    },
  );

  const { notices, activities } = groupBoardParser(data.activityGroupBoards); // 게시판 분류 파싱
  data.notices = notices;
  data.activities = activities;

  return data;
};
/**
 * 활동 신청
 */
export const postActivityGroupMemberApply = async ({
  activityGroupId,
  body,
}: PostActivityGroupMemberApplyPrams) => {
  const { data } = await server.post<ActivityRequestType, BaseResponse<number>>(
    {
      url: createCommonPagination(END_POINT.ACTIVITY_GROUP_MEMBER_APPLY, {
        activityGroupId,
      }),
      body,
    },
  );

  return data;
};
/**
 * 상태별 활동 멤버 조회
 */
export const getActivityGroupApplyByStatus = async (
  activityGroupId: number,
  page: number,
  size: number,
) => {
  const { data } = await server.get<PaginationType<ActivityApplyMemberType>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_ADMIN_MEMBERS, {
      activityGroupId,
      page,
      size,
    }),
  });

  return data;
};
/**
 * 나의 활동 목록 조회
 */
export const getActivityGroupMemberMy = async (page: number, size: number) => {
  const { data } = await server.get<PaginationType<ActivityGroupMemberMyType>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_MEMBER_MY, {
      page,
      size,
    }),
  });

  return data;
};
/**
 * 활동 신청 상태
 */
export const patchActivityGroupMemberApply = async ({
  activityGroupId,
  memberId,
  status,
}: PatchActivityGroupMemberApplyPrams) => {
  const params = { activityGroupId, memberId, status };
  const { data } = await server.patch<unknown, BaseResponse<string>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_ADMIN_ACCEPT, params),
  });

  return data;
};
/**
 * 게시판 단일 조회
 */
export const getActivityBoard = async (activityGroupBoardId: number) => {
  const { data } = await server.get<BaseResponse<ActivityBoardType>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_BOARDS, {
      activityGroupBoardId,
    }),
  });

  return data;
};
/**
 * 나의 과제 제출 게시판 조회
 */
export const getActivityBoardsMyAssignment = async (parentId: number) => {
  const { data } = await server.get<BaseResponse<ActivityBoardType[]>>({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_BOARDS_MY_ASSIGNMENT, {
      parentId,
    }),
  });

  return data;
};
/**
 * 활동 그룹 게시판 생성
 */
export const postActivityBoard = async ({
  parentId,
  memberId,
  activityGroupId,
  body,
  files,
}: PostActivityBoardPrams) => {
  const params = {
    parentId: parentId,
    memberId: memberId,
    activityGroupId: activityGroupId,
  };

  let fileUrl: string | null = null;

  if (parentId && memberId && files) {
    // 파일이 있을 경우 파일 업로드 진행
    const data = await postUploadedFileAssignment({
      groupId: activityGroupId,
      groupBoardId: parentId,
      storagePeriod: 30, // 파일 보관 기간
      files,
    });

    fileUrl = data[0].fileUrl;
  }

  const { data } = await server.post<
    SubmitBoardType,
    BaseResponse<{ id: number; parentId: number }>
  >({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_BOARD, params),
    body: {
      ...body,
      fileUrls: fileUrl ? [fileUrl] : undefined,
    },
  });

  return data;
};
/**
 * 활동 그룹 게시판 수정
 */
export const patchActivityBoard = async ({
  activityGroupBoardId,
  groupId,
  groupBoardId,
  body,
  files,
}: PatchActivityBoardPrams) => {
  let fileUrl: string | null = null;

  if (groupId && groupBoardId && files) {
    // 파일이 있을 경우 파일 업로드 진행
    const data = await postUploadedFileAssignment({
      groupId: groupId,
      groupBoardId: groupBoardId,
      storagePeriod: 30, // 파일 보관 기간
      files,
    });

    fileUrl = data[0].fileUrl;
  }

  const { data } = await server.patch<
    SubmitBoardType,
    BaseResponse<{ id: number; parentId: number }>
  >({
    url: createCommonPagination(END_POINT.ACTIVITY_GROUP_BOARDS, {
      activityGroupBoardId,
    }),
    body: {
      ...body,
      fileUrls: fileUrl ? [fileUrl] : undefined,
    },
  });

  return data;
};
/**
 * 활동 사진 등록
 */
export const postActivityPhoto = async (body: PostActivityPhotoPrams) => {
  const fileData = await postFilesActivityPhotos(createFormData(body.file));
  const fileUrl = fileData[0].fileUrl;

  const { data } = await server.post<ActivityPhotosBody, BaseResponse<number>>({
    url: END_POINT.MAIN_ACTIVITY_PHOTO,
    body: {
      ...body,
      fileUrlList: [fileUrl],
    },
  });

  return data;
};
