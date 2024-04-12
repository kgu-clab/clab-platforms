import { useSuspenseQuery } from '@tanstack/react-query';

import { getMembershipFee } from '@api/membershipFee';
import { QUERY_KEY } from '@constants/key';

import { PaginationPramsType } from '@type/api';

interface UseMembershipFeeParamsType extends PaginationPramsType {
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
}: UseMembershipFeeParamsType = {}) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MEMBERSHIP_FEE, memberId],
    queryFn: () =>
      getMembershipFee({
        memberId,
        memberName,
        category,
        page,
        size,
      }),
  });
};
