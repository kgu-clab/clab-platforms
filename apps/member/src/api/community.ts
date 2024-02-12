import { PaginationType } from '@type/api';
import { server } from './server';
import { createCommunityPagination, createPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type { CommunityPostItem } from '@type/community';

// 커뮤니티 게시글 조회
export const getMyCommunity = async (
  page: number,
  size: number,
  category: string,
) => {
  const { data } = await server.get<PaginationType<CommunityPostItem>>({
    url: createPagination(END_POINT.MY_COMMUNITY, page, size),
  });

  const categoryPost = data.items.filter((post) => post.category === category);

  return categoryPost;
};

export const getCommunityList = async (
  category: string,
  page: number,
  size: number,
) => {
  const { data } = await server.get<PaginationType<CommunityPostItem>>({
    url: createCommunityPagination(
      END_POINT.COMMUNITY_LIST,
      category,
      page,
      size,
    ),
  });

  return data;
};
