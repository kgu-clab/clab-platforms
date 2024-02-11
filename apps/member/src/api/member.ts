import { server } from './server';
import { API_BASE_URL, END_POINT } from '@constants/api';
import { createPath } from '@constants/path';
import type { BaseResponse } from '@type/api';
import type { ProfileData } from '@type/profile';
import { getAccessToken } from '@utils/api';

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
// server-chain patch 이슈로 임시로 fetch API를 사용합니다.
export const patchUserInfo = async ({ id, body }: PatchUserInfoArgs) => {
  const accessToken = getAccessToken();

  const { data } = await fetch(
    createPath(API_BASE_URL, END_POINT.MY_INFO_EDIT(id)),
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  return data;
};
