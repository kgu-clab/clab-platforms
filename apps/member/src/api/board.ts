import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';

import { BaseResponse, ResponsePagination } from '@type/api';
import type { BoardItem } from '@type/board';
import type {
  CommunityCategoryType,
  CommunityPostDetailItem,
  CommunityWriteItem,
} from '@type/community';
import type { PostItem } from '@type/post';

import { server } from './server';

export interface PatchBoardsParams {
  id: number;
  body: CommunityWriteItem;
}

/**
 * 내가 작성한 커뮤니티 게시글 조회
 */
export const getMyBoards = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<ResponsePagination<BoardItem>>({
    url: createCommonPagination(END_POINT.MY_BOARDS, params),
  });

  return data;
};
/**
 * 커뮤니티 게시글 목록 조회
 */
export const getBoards = async (page: number, size: number) => {
  const { data } = await server.get<ResponsePagination<BoardItem>>({
    url: createCommonPagination(END_POINT.BOARDS, { page, size }),
  });

  return data;
};
/**
 * 커뮤니티 게시글 카테고리별 조회
 */
export const getBoardsList = async (
  category: CommunityCategoryType,
  page: number,
  size: number,
) => {
  const { data } = await server.get<ResponsePagination<PostItem>>({
    url: createCommonPagination(END_POINT.BOARDS_LIST, {
      category: category.toUpperCase(),
      page,
      size,
    }),
  });

  return data;
};
/**
 * 커뮤니티 게시글 작성
 */
export const postBoardsWrite = (body: CommunityWriteItem) => {
  return server.post<CommunityWriteItem, BaseResponse<CommunityCategoryType>>({
    url: END_POINT.BOARDS,
    body: {
      ...body,
      category: body.category.toUpperCase(),
    },
  });
};
/**
 * 커뮤니티 게시글 상세 조회
 */
export const getBoardsDetail = (id: number) => {
  return server.get<BaseResponse<CommunityPostDetailItem>>({
    url: END_POINT.BOARDERS_ITEM(id),
  });
};
/**
 * 커뮤니티 게시글 수정
 */
export const patchBoards = ({ id, body }: PatchBoardsParams) => {
  return server.patch<CommunityWriteItem, BaseResponse<CommunityCategoryType>>({
    url: END_POINT.BOARDERS_ITEM(id),
    body: {
      ...body,
      category: body.category.toUpperCase(),
    },
  });
};
/**
 * 커뮤니티 게시글 삭제
 */
export const deleteBoards = (id: number) => {
  return server.del<never, BaseResponse<CommunityCategoryType>>({
    url: END_POINT.BOARDERS_ITEM(id),
  });
};
