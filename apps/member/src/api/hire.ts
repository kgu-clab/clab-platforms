import { PaginationType } from '@type/api';
import { server } from './server';
import { createPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import { HireItem } from '@type/hire';

// 채용 공고 조회
export const getMyHire = async (page: number, size: number) => {
  const { data } = await server.get<PaginationType<HireItem>>({
    url: createPagination(END_POINT.MY_HIRE, page, size),
  });

  return data;
};
