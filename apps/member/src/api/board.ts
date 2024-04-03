import { BaseResponse, PaginationType } from '@type/api';
import { server } from './server';
import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';
import type { BoardItem } from '@type/board';
import type {
  CommunityCategoryKorType,
  CommunityPostDetailItem,
  CommunityWriteItem,
} from '@type/community';
import type { PostItem } from '@type/post';

interface PatchBoardsParams {
  id: string;
  body: CommunityWriteItem;
}

/**
 * 내가 작성한 커뮤니티 게시글 조회
 */
export const getMyBoards = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<BoardItem>>({
    url: createCommonPagination(END_POINT.MY_BOARDS, params),
  });

  return data;
};
/**
 * 커뮤니티 게시글 목록 조회
 */
export const getBoards = async (page: number, size: number) => {
  const { data } = await server.get<PaginationType<BoardItem>>({
    url: createCommonPagination(END_POINT.BOARDS, { page, size }),
  });

  return data;
};
/**
 * 커뮤니티 게시글 카테고리별 조회
 */
export const getBoardsList = async (
  category: CommunityCategoryKorType,
  page: number,
  size: number,
) => {
  const params = { category, page, size };
  const { data } = await server.get<PaginationType<PostItem>>({
    url: createCommonPagination(END_POINT.BOARDS_LIST, params),
  });

  return data;
};
/**
 * 커뮤니티 게시글 작성
 */
export const postBoardsWrite = async (body: CommunityWriteItem) => {
  const { data } = await server.post<CommunityWriteItem, BaseResponse<number>>({
    url: END_POINT.BOARDS,
    body,
  });

  return data;
};
/**
 * 커뮤니티 게시글 상세 조회
 */
export const getBoardsDetail = async (id: string) => {
  const { data } = await server.get<BaseResponse<CommunityPostDetailItem>>({
    url: END_POINT.BOARDERS_ITEM(id),
  });

  return data;
};
/**
 * 커뮤니티 게시글 수정
 */
export const patchBoards = async ({ id, body }: PatchBoardsParams) => {
  const { data } = await server.patch<CommunityWriteItem, BaseResponse>({
    url: END_POINT.BOARDERS_ITEM(id),
    body,
  });

  return data;
};
