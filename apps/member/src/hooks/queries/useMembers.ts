import { useSuspenseQuery } from '@tanstack/react-query';

import { getMembers } from '@api/member';
import { MEMBER_QUERY_KEY } from '@constants/key';
import { getTime } from '@utils/date';

import type { WithPaginationParams } from '@type/api';

interface UseMembersParams extends WithPaginationParams {
  id: string;
  name?: string;
}

/**
 * 멤버의 정보를 조회합니다.
 */
export const useMembers = ({
  id,
  name,
  page = 0,
  size = 20,
}: UseMembersParams) => {
  return useSuspenseQuery({
    queryFn: () =>
      getMembers({
        id,
        name,
        page,
        size,
      }),
    queryKey: MEMBER_QUERY_KEY.MEMBER(id),
    staleTime: getTime(0, 10, 0),
  });
};
