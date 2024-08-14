import { createPagination } from '@clab-platforms/utils';

import { END_POINT } from '@constants/api';

import type {
  BaseResponse,
  ResponsePagination,
  WithPaginationParams,
} from '@type/api';
import type {
  MemberInfo,
  MemberProfileRequestType,
  MemberProfileType,
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
