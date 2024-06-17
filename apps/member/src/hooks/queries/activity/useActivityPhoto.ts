import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityPhoto } from '@api/activity';
import { ACTIVITY_QUERY_KEY } from '@constants/key';
import { STALE_TIME } from '@constants/state';

import type { WithPaginationParams } from '@type/api';

/**
 * 활동 사진을 조회합니다.
 */
export function useActivityPhoto({
  page = 0,
  size = 6,
}: WithPaginationParams = {}) {
  return useSuspenseQuery({
    queryKey: ACTIVITY_QUERY_KEY.PHOTOS(),
    queryFn: () => getActivityPhoto(page, size),
    staleTime: STALE_TIME.LONG,
  });
}
