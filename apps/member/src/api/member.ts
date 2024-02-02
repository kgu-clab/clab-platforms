import { server } from './server';
import { END_POINT } from '@constants/api';
import type { BaseResponse } from '@type/api';
import type { MemberType } from '@type/member';

interface PatchUserInfoArgs {
  id: string;
  body: MemberType;
}

// 내 정보 수정
export const patchUserInfo = async ({ id, body }: PatchUserInfoArgs) => {
  const { data } = await server.patch<MemberType, BaseResponse<MemberType>>({
    url: END_POINT.MY_INFO_EDIT(id),
    body: body,
  });

  return data;
};
