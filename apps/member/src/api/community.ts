import { BaseResponse, PaginationType } from '@type/api';
import { server } from './server';
import { createCommonPagination } from '@utils/api';
import { END_POINT } from '@constants/api';
import type {
  CommunityPostDetailItem,
  CommunityPostItem,
  CommunityWriteItem,
} from '@type/community';

interface PatchPostArgs {
  id: string;
  body: CommunityWriteItem;
}

// 커뮤니티 게시글 조회
export const getMyCommunity = async (
  page: number,
  size: number,
  category: string,
) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<CommunityPostItem>>({
    url: createCommonPagination(END_POINT.MY_COMMUNITY, params),
  });

  return data.items.filter((post) => post.category === category);
};

// 커뮤니티 게시글 카테고리별 조회
export const getCommunityList = async (
  category: string,
  page: number,
  size: number,
) => {
  const params = { category, page, size };
  const { data } = await server.get<PaginationType<CommunityPostItem>>({
    url: createCommonPagination(END_POINT.COMMUNITY_LIST, params),
  });

  return data;
};

// 커뮤니티 게시글 작성
export const postCommunityWrite = async (body: CommunityWriteItem) => {
  const { data } = await server.post<CommunityWriteItem, BaseResponse>({
    url: END_POINT.MY_COMMUNITY,
    body,
  });

  return data;
};

// 커뮤니티 게시글 상세 조회
export const getCommunityPost = async (id: string) => {
  const { data } = await server.get<BaseResponse<CommunityPostDetailItem>>({
    url: END_POINT.COMMUNITY_POST(id),
  });

  return data;
};

// 커뮤니티 게시글 수정
export const patchCommunityPost = async ({ id, body }: PatchPostArgs) => {
  const { data } = await server.patch<CommunityWriteItem, BaseResponse>({
    url: END_POINT.COMMUNITY_POST(id),
    body,
  });

  return data;
};
