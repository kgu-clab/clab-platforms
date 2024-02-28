import { server } from './server';
import { END_POINT } from '@constants/api';
import type { BaseResponse } from '@type/api';
import type { ProfileData } from '@type/profile';
import { postUploadedFileProfileImage } from './uploadedFile';

interface PatchUserInfoArgs {
  id: string;
  body: ProfileData;
  multipartFile: FormData | null;
}
// 내 정보
export const getMyProfile = async () => {
  const { data } = await server.get<BaseResponse<ProfileData>>({
    url: END_POINT.MY_PROFILE,
  });

  return data;
};

// 내 정보 수정
export const patchUserInfo = async ({
  id,
  body,
  multipartFile,
}: PatchUserInfoArgs) => {
  let userInfoData;
  if (multipartFile) {
    const data = await postUploadedFileProfileImage({
      memberId: body.id,
      storagePeriod: 30,
      multipartFile: multipartFile,
    });

    userInfoData = {
      ...body,
      imageUrl: data.fileUrl,
    };
  } else {
    userInfoData = body;
  }

  const { data } = await server.patch<ProfileData, BaseResponse<string>>({
    url: END_POINT.MY_INFO_EDIT(id),
    body: userInfoData,
  });

  return data;
};
