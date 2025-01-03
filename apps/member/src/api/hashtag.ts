import { END_POINT } from '@constants/api';

import type { BaseResponse } from '@type/api';
import type { Hashtag } from '@type/hashtag';

import { server } from './server';

/**
 * 해시태그 조회
 */
export async function getHashtags() {
  const { data } = await server.get<BaseResponse<Array<Hashtag>>>({
    url: END_POINT.HASHTAG,
  });
  return data;
}
