import { useQuery } from '@tanstack/react-query';

import { getSupportsDetail } from '@api/support';
import { SUPPORT_QUERY_KEY } from '@constants/key';

/**
 * 문의 상세를 조회합니다.
 */
export const useSupportDetail = (id: number, enabled: boolean) => {
  return useQuery({
    queryKey: SUPPORT_QUERY_KEY.DETAIL(id),
    queryFn: () => getSupportsDetail(id),
    enabled,
    refetchOnMount: true,
  });
};
