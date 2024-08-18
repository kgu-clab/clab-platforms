import { useSuspenseQuery } from '@tanstack/react-query';

import { getRecruitment } from '@api/recruitment';
import { RECRUITMENT_QUERY_KEY } from '@constants/key';

/**
 * 최근 모집 공고 목록을 조회합니다.
 */
export function useRecruitment() {
  return useSuspenseQuery({
    queryKey: RECRUITMENT_QUERY_KEY.LIST(),
    queryFn: () => getRecruitment(),
  });
}
