import { useSuspenseQuery } from '@tanstack/react-query';

import { getMembershipFee } from '@api/membershipFee';
import { MEMBERSHIP_FEE_QUERY_KEY } from '@constants/key';
import { STALE_TIME } from '@constants/state';

import { WithPaginationParams, WithPermissionParams } from '@type/api';

interface Params extends WithPaginationParams, WithPermissionParams {
  memberId?: string;
  memberName?: string;
  category?: string;
}

/**
 * 회비 정보를 조회합니다.
 */
export const useMembershipFee = ({
  memberId,
  memberName,
  category,
  page = 0,
  size = 20,
  hasPermission,
}: Params = {}) => {
  return useSuspenseQuery({
    queryKey: MEMBERSHIP_FEE_QUERY_KEY.PAGE({ page, size }),
    queryFn: () =>
      getMembershipFee({
        memberId,
        memberName,
        category,
        page,
        size,
      }),
    staleTime: hasPermission ? STALE_TIME.ALWAYS : STALE_TIME.LONG,
  });
};
