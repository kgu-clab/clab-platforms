import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityPhoto } from '@api/activity';
import { QUERY_KEY } from '@constants/key';

/**
 * 활동 사진을 조회합니다.
 */
export const useActivityPhoto = (page = 0, size = 6) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MAIN_ACTIVITY_PHOTO, page, size],
    queryFn: () => getActivityPhoto(page, size),
  });
};
