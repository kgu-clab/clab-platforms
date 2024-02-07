import { server } from './server';
import { END_POINT } from '@constants/api';
import type { BaseResponse } from '@type/api';
import { ProfileData } from '@type/profile';

interface PatchUserInfoArgs {
  id: string;
  body: ProfileData;
}
// 내 정보
export const getMyProfile = async () => {
  const { data } = await server.get<BaseResponse<ProfileData>>({
    url: END_POINT.MY_PROFILE,
  });
  return data;
};

// 내 정보 수정
export const patchUserInfo = async ({ id, body }: PatchUserInfoArgs) => {
  const { data } = await server.patch<ProfileData, BaseResponse<ProfileData>>({
    url: END_POINT.MY_INFO_EDIT(id),
    body: body,
  });
  return data;
};
