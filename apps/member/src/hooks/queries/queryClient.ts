import { QueryCache, QueryClient } from '@tanstack/react-query';

import { IS_DEVELOPMENT } from '@constants/environment';
import { ERROR_MESSAGE } from '@constants/message';
import { STALE_TIME } from '@constants/state';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: STALE_TIME.DEFAULT,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      if (IS_DEVELOPMENT) {
        // eslint-disable-next-line no-console
        console.warn(ERROR_MESSAGE.NETWORK);
      }
    },
  }),
});
