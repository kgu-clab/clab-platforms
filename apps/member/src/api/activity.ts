import { createPagination, createURL } from '@clab-platforms/utils';

import { END_POINT } from '@constants/api';
import { UNSPLASH_ACCESS_KEY } from '@constants/environment';
import { ACTIVITY_BOARD_CATEGORY_STATE } from '@constants/state';
import { createFormData } from '@utils/api';
import { groupBoardParser } from '@utils/group';

import type {
  ActivityApplyMemberType,
  ActivityBoardType,
  ActivityGroupBoardCategoryType,
  ActivityGroupBoardParserType,
  ActivityGroupCreateItem,
  ActivityGroupItem,
  ActivityGroupMemberType,
  ActivityGroupStatusType,
  ActivityMemberRoleType,
  ActivityPhotoItem,
  ActivityPhotosBody,
  ActivityRequestType,
  SubmitBoardType,
} from '@type/activity';
import type { BaseResponse, ResponsePagination } from '@type/api';

import { server } from './server';
import {
  postFilesActivityPhotos,
  postUploadedFileAssignment,
  postUploadedFileWeekly,
} from './uploadedFile';

export interface PatchActivityGroupMemberApplyParams {
  activityGroupId: number;
  memberId: string;
  status: string;
}

export interface PostActivityGroupMemberApplyParams {
  activityGroupId: number;
  body: ActivityRequestType;
}

export interface PostActivityBoardParams {
  activityGroupId: number;
  body: SubmitBoardType;
  parentId?: number;
  memberId?: string;
  files?: FormData;
}

export interface PatchActivityBoardParams {
  activityGroupBoardId: number;
  groupId?: number;
  groupBoardId?: number;
  body: SubmitBoardType;
  files?: FormData;
}

export interface PostActivityPhotoParams {
  title: string;
  date: string;
  file: File;
}

export interface GetActivityBoardByCategoryParams {
  activityGroupId: number;
  category: ActivityGroupBoardCategoryType;
  page: number;
  size: number;
}

export interface GetActivityBoardByParentParams {
  parentId: number;
  page: number;
  size: number;
}
export interface GetActivityGroupMemberParams {
  activityGroupId: number;
  page: number;
  size: number;
}

export interface PatchActivityGroupParams {
  activityGroupId: number;
  activityGroupStatus: ActivityGroupStatusType;
}

export interface PatchActivityGroupAdminParams {
  activityGroupId: number;
  body: ActivityGroupCreateItem;
}

export interface PatchActivityGroupMemberRoleParams {
  activityGroupId: number;
  memberId: string;
  position: ActivityMemberRoleType;
}

export interface GetActivityGroupMemberMyParams {
  status?: ActivityGroupStatusType;
  page: number;
  size: number;
}

/**
 * 활동 사진 조회
 */
export async function getActivityPhoto(page: number, size: number) {
  const { data } = await server.get<ResponsePagination<ActivityPhotoItem>>({
    url: createPagination(END_POINT.MAIN_ACTIVITY_PHOTO, { page, size }),
  });

  return data;
}

/**
 * 활동 상태별 조회
 */
export async function getActivityGroupByStatus(
  activityGroupStatus: ActivityGroupStatusType,
  page: number,
  size: number,
) {
  const { data } = await server.get<ResponsePagination<ActivityGroupItem>>({
    url: createPagination(END_POINT.ACTIVITY_GROUP_MEMBER_STATUS, {
      activityGroupStatus,
      page,
      size,
    }),
  });

  return data;
}

/**
 * 활동 상세 조회
 */
export async function getActivityGroupDetail(id: number) {
  const { data } = await server.get<BaseResponse<ActivityGroupBoardParserType>>(
    {
      url: END_POINT.ACTIVITY_GROUP_MEMBER(id),
    },
  );

  const { notices, activities, assignments } = groupBoardParser(
    data.activityGroupBoards,
  ); // 게시판 분류 파싱
  data.notices = notices;
  data.activities = activities;
  data.assignments = assignments;

  return {
    ...data,
    notices,
    activities,
    assignments,
  };
}

/**
 * 활동 신청
 */
export async function postActivityGroupMemberApply({
  activityGroupId,
  body,
}: PostActivityGroupMemberApplyParams) {
  return server.post<ActivityRequestType, BaseResponse<number>>({
    url: createPagination(END_POINT.ACTIVITY_GROUP_MEMBER_APPLY, {
      activityGroupId,
    }),
    body,
  });
}

/**
 * 활동 신청자 및 지원서 조회
 */
export async function getActivityGroupApplyByStatus(
  activityGroupId: number,
  page: number,
  size: number,
) {
  const { data } = await server.get<
    ResponsePagination<ActivityApplyMemberType>
  >({
    url: createPagination(END_POINT.ACTIVITY_GROUP_ADMIN_MEMBERS, {
      activityGroupId,
      page,
      size,
    }),
  });

  return data;
}

/**
 * 나의 활동 목록 조회
 */
export async function getActivityGroupMemberMy({
  status,
  page,
  size,
}: GetActivityGroupMemberMyParams) {
  const { data } = await server.get<ResponsePagination<ActivityGroupItem>>({
    url: createPagination(END_POINT.ACTIVITY_GROUP_MEMBER_MY, {
      status,
      page,
      size,
    }),
  });

  return data;
}

/**
 * 활동 신청 상태
 */
export async function patchActivityGroupMemberApply({
  activityGroupId,
  memberId,
  status,
}: PatchActivityGroupMemberApplyParams) {
  const { data } = await server.patch<never, BaseResponse<number>>({
    url: createPagination(END_POINT.ACTIVITY_GROUP_ADMIN_ACCEPT, {
      activityGroupId,
      memberId,
      status,
    }),
  });

  return data;
}

/**
 * 게시판 단일 조회
 */
export async function getActivityBoard(activityGroupBoardId: number) {
  const { data } = await server.get<BaseResponse<ActivityBoardType>>({
    url: createPagination(END_POINT.ACTIVITY_GROUP_BOARDS, {
      activityGroupBoardId,
    }),
  });

  return data;
}

/**
 * 나의 과제 제출 게시판 조회
 */
export async function getActivityBoardMyAssignment(parentId: number) {
  const { data } = await server.get<BaseResponse<ActivityBoardType[]>>({
    url: createPagination(END_POINT.ACTIVITY_GROUP_BOARDS_MY_ASSIGNMENT, {
      parentId,
    }),
  });

  return data;
}

/**
 * 활동 그룹 게시판 생성
 */
export async function postActivityBoard({
  parentId,
  memberId,
  activityGroupId,
  body,
  files,
}: PostActivityBoardParams) {
  const params = {
    parentId: parentId,
    memberId: memberId,
    activityGroupId: activityGroupId,
  };

  let fileUrl: string | null = null;

  if (
    body.category === ACTIVITY_BOARD_CATEGORY_STATE.ASSIGNMENT &&
    parentId &&
    memberId &&
    files
  ) {
    // 파일이 있을 경우 파일 업로드 진행 (과제 파일)
    const data = await postUploadedFileAssignment({
      groupId: activityGroupId,
      groupBoardId: parentId,
      files,
    });

    fileUrl = data[0].fileUrl;
  } else if (
    body.category === ACTIVITY_BOARD_CATEGORY_STATE.WEEKLY_ACTIVITY &&
    memberId &&
    files
  ) {
    // 파일이 있을 경우 파일 업로드 진행 (주차별 파일)
    const data = await postUploadedFileWeekly({
      groupId: activityGroupId,
      files,
    });

    fileUrl = data[0].fileUrl;
  }

  const { data } = await server.post<
    SubmitBoardType,
    BaseResponse<{ id: number; groupId: number; parentId: number }>
  >({
    url: createPagination(END_POINT.ACTIVITY_GROUP_BOARD, params),
    body: {
      ...body,
      fileUrls: fileUrl ? [fileUrl] : undefined,
    },
  });

  return data;
}

/**
 * 활동 그룹 게시판 수정
 */
export async function patchActivityBoard({
  activityGroupBoardId,
  groupId,
  groupBoardId,
  body,
  files,
}: PatchActivityBoardParams) {
  let fileUrl: string | null = null;

  if (groupBoardId === null && groupId && files) {
    // 파일이 있을 경우 파일 업로드 진행 (주차별 활동 파일)
    const data = await postUploadedFileWeekly({
      groupId: groupId,
      files,
    });

    fileUrl = data[0].fileUrl;
  } else if (groupId && groupBoardId && files) {
    // 파일이 있을 경우 파일 업로드 진행 (과제 파일)
    const data = await postUploadedFileAssignment({
      groupId: groupId,
      groupBoardId: groupBoardId,
      files,
    });

    fileUrl = data[0].fileUrl;
  }

  const { data } = await server.patch<
    SubmitBoardType,
    BaseResponse<{ id: number; groupId: number; parentId: number }>
  >({
    url: createPagination(END_POINT.ACTIVITY_GROUP_BOARDS, {
      activityGroupBoardId,
    }),
    body: {
      ...body,
      fileUrls: fileUrl ? [fileUrl] : undefined,
    },
  });

  return data;
}

/**
 * 활동 사진 등록
 */
export async function postActivityPhoto(body: PostActivityPhotoParams) {
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
}

/**
 * 활동 내 카테고리 게시판 조회
 */
export async function getActivityBoardByCategory({
  activityGroupId,
  category,
  page,
  size,
}: GetActivityBoardByCategoryParams) {
  const { data } = await server.get<ResponsePagination<ActivityBoardType>>({
    url: createPagination(END_POINT.ACTIVITY_GROUP_BOARD_BY_CATEGORY, {
      activityGroupId,
      category,
      page,
      size,
    }),
  });

  return data;
}

/**
 * 활동 그룹 게시판 계층 구조적 조회
 */
export async function getActivityBoardByParent({
  parentId,
  page,
  size,
}: GetActivityBoardByParentParams) {
  const { data } = await server.get<ResponsePagination<ActivityBoardType>>({
    url: createPagination(END_POINT.ACTIVITY_GROUP_BOARD_BY_PARENT, {
      parentId,
      page,
      size,
    }),
  });

  return data;
}

/**
 * 활동 멤버 조회
 */
export async function getActivityGroupMember({
  activityGroupId,
  page,
  size,
}: GetActivityGroupMemberParams) {
  const { data } = await server.get<
    ResponsePagination<ActivityGroupMemberType>
  >({
    url: createPagination(END_POINT.ACTIVITY_GROUP_MEMBER_MEMBERS, {
      activityGroupId,
      page,
      size,
    }),
  });

  return data;
}

/**
 * 키워드 사진 검색
 */
export async function getSearchImage(keyword: string) {
  const accessKey = UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    throw new Error('no access key');
  }

  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.append('query', keyword);

  const response = await fetch(url.href, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching images: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

/**
 * 활동 생성
 */
export async function postActivityGroup(body: ActivityGroupCreateItem) {
  const { data } = await server.post<
    ActivityGroupCreateItem,
    BaseResponse<number>
  >({
    url: createURL(END_POINT.ACTIVITY_GROUP_ADMIN),
    body,
  });

  return data;
}

/**
 * 활동 삭제
 */
export async function deleteActivityGroup(activityGroupId: number) {
  const { data } = await server.del<never, BaseResponse<number>>({
    url: createURL(END_POINT.ACTIVITY_GROUP_ADMIN_DETAIL(activityGroupId)),
  });

  return data;
}

/**
 * 활동 상태 변경
 */
export async function patchActivityGroup({
  activityGroupId,
  activityGroupStatus,
}: PatchActivityGroupParams) {
  const { data } = await server.patch<
    never,
    BaseResponse<{ id: number; status: ActivityGroupStatusType }>
  >({
    url: createPagination(
      END_POINT.ACTIVITY_GROUP_ADMIN_MANAGE(activityGroupId),
      {
        activityGroupStatus,
      },
    ),
  });

  return data;
}

/**
 * 활동 수정
 */
export async function patchActivityGroupAdmin({
  activityGroupId,
  body,
}: PatchActivityGroupAdminParams) {
  const { data } = await server.patch<
    ActivityGroupCreateItem,
    BaseResponse<number>
  >({
    url: createURL(END_POINT.ACTIVITY_GROUP_ADMIN_DETAIL(activityGroupId)),
    body,
  });

  return data;
}

/**
 * 활동 게시판 삭제
 */
export async function deleteActivityGroupBoards(activityGroupBoardId: number) {
  const { data } = await server.del<
    never,
    BaseResponse<{ id: number; groupId: number; parentId: number }>
  >({
    url: createPagination(END_POINT.ACTIVITY_GROUP_BOARDS, {
      activityGroupBoardId,
    }),
  });

  return data;
}

/**
 * 활동 그룹 멤버 역할 변경
 */
export async function patchActivityGroupMemberRole({
  activityGroupId,
  memberId,
  position,
}: PatchActivityGroupMemberRoleParams) {
  const { data } = await server.patch<never, BaseResponse<number>>({
    url: createPagination(END_POINT.ACTIVITY_GROUP_ADMIN_POSITION, {
      activityGroupId,
      memberId,
      position,
    }),
  });

  return data;
}

/**
 * 내가 지원한 활동 목록 조회
 */
export async function getActivityGroupMemberApplied(
  page: number,
  size: number,
) {
  const { data } = await server.get<ResponsePagination<ActivityGroupItem>>({
    url: createPagination(END_POINT.ACTIVITY_GROUP_MEMBER_APPLIED, {
      page,
      size,
    }),
  });

  return data;
}
