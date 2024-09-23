import { createPagination } from '@clab-platforms/utils';

import { END_POINT } from '@constants/api';

import type {
  BaseResponse,
  ResponsePagination,
  WithPaginationParams,
} from '@type/api';
import { AddMemberRequestType } from '@type/manage.ts';
import type {
  MemberInfo,
  MemberProfileRequestType,
  MemberProfileType,
  MemberRoleListType,
  MemberRoleRequestType,
  RoleLevelKey,
} from '@type/member';

import { server } from './server';
import { postUploadedFileProfileImage, uploadFiles } from './uploadedFile';

export interface GetMembersParams extends WithPaginationParams {
  id?: string; // 학번
  name?: string;
}

export interface PatchUserInfoParams {
  id: string; // 학번
  body: MemberProfileRequestType;
  file?: File; // 프로필 이미지
}

export interface GetMemberRoleParams extends WithPaginationParams {
  memberId?: string;
  memberName?: string;
  role?: RoleLevelKey;
  sortBy?: string;
  sortDirection?: string;
}

export interface PatchMemberRoleParams {
  memberId: string;
  body: MemberRoleRequestType;
}

/**
 * 멤버 정보 조회
 */
export async function getMembers({ id, name, page, size }: GetMembersParams) {
  const { data } = await server.get<ResponsePagination<MemberInfo>>({
    url: createPagination(END_POINT.MEMBERS, {
      id,
      name,
      page,
      size,
    }),
  });

  return data;
}
/**
 * 내 프로필 조회
 */
export async function getMyProfile(): Promise<MemberProfileType> {
  const { data } = await server.get<BaseResponse<MemberProfileType>>({
    url: END_POINT.MY_PROFILE,
  });

  return data;
}
/**
 * 멤버 정보 수정
 */
export async function patchUserInfo({
  id,
  body,
  file,
}: PatchUserInfoParams): Promise<string> {
  if (file) {
    const data = await uploadFiles([file], postUploadedFileProfileImage);
    body.imageUrl = data.fileUrl;
  }

  const { data } = await server.patch<
    MemberProfileRequestType,
    BaseResponse<string>
  >({
    url: END_POINT.MY_INFO_EDIT(id),
    body,
  });

  return data;
}

/**
 * 멤버 레밸 조회
 */
export async function getMemberRole({
  memberId,
  memberName,
  role,
  page,
  size,
  sortBy,
  sortDirection,
}: GetMemberRoleParams) {
  const { data } = await server.get<ResponsePagination<MemberRoleListType>>({
    url: createPagination(END_POINT.MEMBER_LEVEL, {
      memberId,
      memberName,
      role,
      page,
      size,
      sortBy,
      sortDirection,
    }),
  });

  return data;
}

/**
 * 멤버 레벨 수정
 */
export async function patchMemberRole({
  memberId,
  body,
}: PatchMemberRoleParams) {
  const { data } = await server.patch<
    MemberRoleRequestType,
    BaseResponse<string>
  >({
    url: END_POINT.MEMBER_LEVEL_EDIT(memberId),
    body,
  });

  return data;
}

/**
 * 멤버 추가
 */
export async function postAddMember(body: AddMemberRequestType) {
  const { data } = await server.post<
    AddMemberRequestType,
    BaseResponse<string>
  >({ url: END_POINT.MEMBER_ADD, body });

  return data;
}

/**
 * 멤버 비밀번호 재전송
 */
export async function postResendMemberPassword(memberId: string) {
  const { data } = await server.post<string, BaseResponse<string>>({
    url: END_POINT.MEMBER_PASSWORD_RESEND(memberId),
  });

  return data;
}
