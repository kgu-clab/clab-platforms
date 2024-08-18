import { useSuspenseQuery } from '@tanstack/react-query';

import { getApplicationConditions } from '@api/application';
import { APPLICATION_QUERY_KEY } from '@constants/key';

import { WithPaginationParams } from '@type/api';

interface useApplicationConditionsParams extends WithPaginationParams {
  recruitmentId: number;
}

/**
 * 모집 지원자 조회
 */
export function useApplicationConditions({
  recruitmentId,
  page = 0,
  size = 6,
}: useApplicationConditionsParams) {
  return useSuspenseQuery({
    queryKey: APPLICATION_QUERY_KEY.RECRUITMENT_PAGE(recruitmentId, {
      page,
      size,
    }),
    queryFn: () => getApplicationConditions({ recruitmentId, page, size }),
  });
}
