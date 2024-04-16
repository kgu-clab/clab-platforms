import { useSuspenseQuery } from '@tanstack/react-query';

import { type GetMembersPrams, getMembers } from '@api/member';
import { QUERY_KEY } from '@constants/key';

/**
 * 멤버의 정보를 조회합니다.
 */
export const useMembers = ({
  id,
  name,
  page = 0,
  size = 20,
}: GetMembersPrams) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MEMBERS, { id, name, page, size }],
    queryFn: () =>
      getMembers({
        id,
        name,
        page,
        size,
      }),
  });
};
