import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyProfile } from '@api/member';
import { MEMBER_QUERY_KEY } from '@constants/key';

/**
 * 내 프로필 정보를 가져옵니다.
 */
export const useMyProfile = () => {
  return useSuspenseQuery({
    queryFn: getMyProfile,
    queryKey: MEMBER_QUERY_KEY.MY(),
  });
};
