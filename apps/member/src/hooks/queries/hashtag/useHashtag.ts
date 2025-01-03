import { useSuspenseQuery } from '@tanstack/react-query';

import { getHashtags } from '@api/hashtag';
import { HASHTAG_QUERY_KEY } from '@constants/key';

/**
 * 존재하는 해시태그를 조회합니다.
 * 해시태그와 각 해시태그가 사용된 횟수를 조회할 수 있습니다.
 */
export function useHashtag() {
  return useSuspenseQuery({
    queryKey: HASHTAG_QUERY_KEY.LIST(),
    queryFn: () => getHashtags(),
  });
}
