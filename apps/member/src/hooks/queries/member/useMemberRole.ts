import { useSuspenseQuery } from '@tanstack/react-query';

import { getMemberRole } from '@api/member';
import { MEMBER_QUERY_KEY } from '@constants/key';

import { WithPaginationParams } from '@type/api';
import { RoleLevelKey } from '@type/member';

interface useMemberRoleParams extends WithPaginationParams {
  memberId?: string;
  memberName?: string;
  role?: RoleLevelKey;
  sortBy?: string;
  sortDirection?: string;
}
export function useMemberRole({
  memberId,
  memberName,
  role,
  page = 0,
  size = 6,
  sortBy,
  sortDirection,
}: useMemberRoleParams) {
  return useSuspenseQuery({
    queryKey: MEMBER_QUERY_KEY.PAGE({ page, size }, role),
    queryFn: () =>
      getMemberRole({
        memberId,
        memberName,
        role,
        page,
        size,
        sortBy,
        sortDirection,
      }),
  });
}
