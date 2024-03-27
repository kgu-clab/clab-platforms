import { server } from './server';
import { END_POINT } from '@constants/api';
import { postUploadedFileProfileImage } from './uploadedFile';
import type { BaseResponse } from '@type/api';
import type { MemberProfileRequestType, MemberProfileType } from '@type/member';

interface PatchUserInfoArgs {
  id: string;
  body: MemberProfileRequestType;
  multipartFile: FormData | null;
}
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
}: PatchUserInfoArgs) => {
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
