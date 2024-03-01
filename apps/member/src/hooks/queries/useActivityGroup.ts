import { getActivityGroupDetail } from '@api/activity';

import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

/**
 * 활동에 대해 상세 조회합니다.
 * @param id 활동 그룹 ID
 */
export const useActivityGroup = (id: string) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.ACTIVITY, id],
    queryFn: () => getActivityGroupDetail(id),
  });
};
