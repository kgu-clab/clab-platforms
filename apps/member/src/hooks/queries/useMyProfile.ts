import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyProfile } from '@api/member';
import { QUERY_KEY } from '@constants/key';

export const useMyProfile = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MY_PROFILE],
    queryFn: () => getMyProfile(),
  });
};
