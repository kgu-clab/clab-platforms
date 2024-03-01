import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { getSharedAccountUsage } from '@api/SharedAccount';

export const useSharedAccountsUsage = (page = 0, size = 20) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.SHARED_ACCOUNT_USAGE, page, size],
    queryFn: () => getSharedAccountUsage(page, size),
  });
};
