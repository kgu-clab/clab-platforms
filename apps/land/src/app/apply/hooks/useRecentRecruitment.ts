import { useQuery } from '@tanstack/react-query';

import { RECRUITMENT_QUERY_KEY } from '@/constants';

import { getRecentRecruitment } from '../api';

/**
 * 최근 일주일 내 종료된 모집공고를 조회합니다.
 */
export function useRecentRecruitment() {
  const { data, isError, isLoading } = useQuery({
    queryKey: RECRUITMENT_QUERY_KEY.RECENT(),
    queryFn: getRecentRecruitment,
  });

  return { data, isError, isLoading };
}
