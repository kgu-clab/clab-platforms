import { useSuspenseQuery } from '@tanstack/react-query';

import { getSharedAccount } from '@api/SharedAccount';
import { QUERY_KEY } from '@constants/key';

export const useSharedAccounts = (page = 0, size = 20) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.SHARED_ACCOUNT, page, size],
    queryFn: () => getSharedAccount(page, size),
  });
};
