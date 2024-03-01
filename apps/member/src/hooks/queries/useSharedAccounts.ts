import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/key';
import { getSharedAccount } from '@api/SharedAccount';

export const useSharedAccounts = (page = 0, size = 20) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.SHARED_ACCOUNT, page, size],
    queryFn: () => getSharedAccount(page, size),
  });
};
