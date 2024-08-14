import { createPagination } from '@clab-platforms/utils';

import { END_POINT } from '@constants/api';

import type { ResponsePagination } from '@type/api';
import type { MemberInfo } from '@type/member';

import { server } from './server';

// 이달의 생일자 조회
export const getBirthday = async (
  month: number,
  page: number,
  size: number,
) => {
  const params = { month, page, size };
  const { data } = await server.get<ResponsePagination<MemberInfo>>({
    url: createPagination(END_POINT.MY_BIRTHDAY, params),
  });

  return data;
};
