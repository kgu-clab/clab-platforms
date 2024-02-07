import { PaginationType } from '@type/api';
import { server } from './server';
import { createBirthdayPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { MemberType } from '@type/member';

// 이달의 생일자 조회
export const getBirthday = async (
  month: number,
  page: number,
  size: number,
) => {
  const { data } = await server.get<PaginationType<MemberType>>({
    url: createBirthdayPagination(END_POINT.MY_BIRTHDAY, month, page, size),
  });
  return data;
};
