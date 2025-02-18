import { useQuery } from '@tanstack/react-query';

import { getApplicationNow } from '@/app/applicationForm/api';
import { RECRUITMENT_QUERY_KEY } from '@/constants';

/**
 * 지원 합격 여부를 조회합니다.
 */
export function useApplicationNow() {
  const { data, isError, isLoading } = useQuery({
    queryKey: RECRUITMENT_QUERY_KEY.NOW(),
    queryFn: getApplicationNow,
  });

  return { data, isError, isLoading };
}
