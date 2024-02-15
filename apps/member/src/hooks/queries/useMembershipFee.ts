import { QUERY_KEY } from '@constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getMembershipFee } from '@api/membershipFee';

export const useMembershipFee = (page = 0, size = 20) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MEMBERSHIP_FEE, page, size],
    queryFn: () => getMembershipFee(page, size),
  });
};
