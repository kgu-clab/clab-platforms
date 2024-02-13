import { BaseResponse, PaginationType } from '@type/api';
import { server } from './server';
import { createCommonPagination, createPath, getAccessToken } from '@utils/api';
import { API_BASE_URL, END_POINT } from '@constants/api';
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

  const categoryPost = data.items.filter((post) => post.category === category);

  return categoryPost;
};

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

export const postCommunityWrite = async (body: CommunityWriteItem) => {
  const accessToken = getAccessToken();

  const { data } = await fetch(
    createPath(API_BASE_URL, END_POINT.MY_COMMUNITY),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  return data;
};

export const getCommunityPost = async (id: string) => {
  const { data } = await server.get<BaseResponse<CommunityPostDetailItem>>({
    url: END_POINT.COMMUNITY_POST(id),
  });

  return data;
};

export const patchCommunityPost = async ({ id, body }: PatchPostArgs) => {
  const accessToken = getAccessToken();

  const { data } = await fetch(
    createPath(API_BASE_URL, END_POINT.COMMUNITY_POST(id)),
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  return data;
};
