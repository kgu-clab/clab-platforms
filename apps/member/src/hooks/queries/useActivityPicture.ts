import { getActivityPhoto } from '@api/activity';
import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useActivityPicture = (page = 0, size = 6) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MAIN_ACTIVITY_PHOTO, page, size],
    queryFn: () => getActivityPhoto(page, size),
  });
};
