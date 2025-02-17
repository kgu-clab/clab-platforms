import { useQuery } from '@tanstack/react-query';

import { EXECUTIVE_QUERY_KEY } from '@/constants';

import { getExecutive } from '../api';

/**
 * 운영진 정보를 조회합니다.
 */
export function useExecutive() {
  const { data, isError } = useQuery({
    queryKey: EXECUTIVE_QUERY_KEY.LIST(),
    queryFn: getExecutive,
  });

  return { data: data, isError };
}
