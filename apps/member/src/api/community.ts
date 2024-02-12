import { PaginationType } from '@type/api';
import { server } from './server';
import {
  createCommunityPagination,
  createPagination,
  createPath,
  getAccessToken,
} from '@utils/api';
import { API_BASE_URL, END_POINT } from '@constants/api';
import type { CommunityPostItem, CommunityWriteItem } from '@type/community';

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

// export const postCommunityWrite = async (body: CommunityWriteItem) => {
//   const { data } = await server.post<string, BaseResponse<number>>({
//     url: END_POINT.MY_COMMUNITY,
//     body: JSON.stringify(body),
//   });

//   return data;
// };

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
