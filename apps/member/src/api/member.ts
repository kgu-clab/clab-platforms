import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';

import type {
  BaseResponse,
  PaginationType,
  WithPaginationPrams,
} from '@type/api';
import type {
  MemberInfo,
  MemberProfileRequestType,
  MemberProfileType,
} from '@type/member';

import { server } from './server';
import { postUploadedFileProfileImage } from './uploadedFile';

export interface GetMembersPrams extends WithPaginationPrams {
  id?: string;
  name?: string;
}

export interface PatchUserInfoPrams {
  id: string;
  body: MemberProfileRequestType;
  multipartFile: FormData | null;
}
/**
 * 멤버 정보 조회
 */
export const getMembers = async ({ id, name, page, size }: GetMembersPrams) => {
  const { data } = await server.get<PaginationType<MemberInfo>>({
    url: createCommonPagination(END_POINT.MEMBERS, {
      id,
      name,
      page,
      size,
    }),
  });

  return data;
};
/**
 * 내 프로필 조회
 */
export const getMyProfile = async () => {
  const { data } = await server.get<BaseResponse<MemberProfileType>>({
    url: END_POINT.MY_PROFILE,
  });

  return data;
};
/**
 * 멤버 정보 수정
 */
export const patchUserInfo = async ({
  id,
  body,
  multipartFile,
}: PatchUserInfoPrams) => {
  if (multipartFile) {
    const data = await postUploadedFileProfileImage(multipartFile);
    body['imageUrl'] = data.fileUrl;
  }

  const { data } = await server.patch<
    MemberProfileRequestType,
    BaseResponse<string>
  >({
    url: END_POINT.MY_INFO_EDIT(id),
    body,
  });

  return data;
};
