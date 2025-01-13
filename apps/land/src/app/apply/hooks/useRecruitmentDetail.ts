import { useQuery } from '@tanstack/react-query';

import { RECRUITMENT_QUERY_KEY } from '@/constants';

import { getRecruitmentDetail } from '../api';

/**
 * 모집 공고를 상세조회합니다.
 */
export function useRecruitmentDetail(id: number) {
  const { data, isError, isLoading } = useQuery({
    queryKey: RECRUITMENT_QUERY_KEY.DETAIL(id),
    queryFn: () => getRecruitmentDetail(id),
  });

  return { data, isError, isLoading };
}
