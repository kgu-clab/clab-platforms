import { useQuery } from '@tanstack/react-query';

import { RECRUITMENT_QUERY_KEY } from '@/constants';

import { getRecruitment } from '../api';

/**
 * 최근 모집 공고 목록을 조회합니다.
 */
export function useRecruitment() {
  const { data, isError } = useQuery({
    queryKey: RECRUITMENT_QUERY_KEY.LIST(),
    queryFn: getRecruitment,
  });

  return { data, isError };
}
