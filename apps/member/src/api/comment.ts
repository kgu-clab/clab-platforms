import { END_POINT } from '@constants/api';
import { createCommonPagination, createPath } from '@utils/api';

import type { BaseResponse, ResponsePagination } from '@type/api';
import type { CommentItem, CommentListItem } from '@type/comment';

import { server } from './server';

interface CommentWriteRequestData {
  content: string;
  wantAnonymous: boolean;
}

export interface PostCommentWriteParams {
  parentId?: number;
  boardId: string;
  body: CommentWriteRequestData;
}
/**
 * 나의 댓글 조회
 */
export const getMyComments = async (page: number, size: number) => {
  const { data } = await server.get<ResponsePagination<CommentItem>>({
    url: createCommonPagination(END_POINT.MY_COMMENTS, {
      page,
      size,
    }),
  });

  return data;
};
/**
 * 댓글 목록 조회
 */
export const getCommentList = async (
  id: string,
  page: number,
  size: number,
) => {
  const params = { id, page, size };
  const { data } = await server.get<ResponsePagination<CommentListItem>>({
    url: createCommonPagination(END_POINT.COMMENTS(id), params),
  });

  return data;
};
/**
 * 댓글 작성
 */
export const postCommentWrite = async ({
  parentId,
  boardId,
  body,
}: PostCommentWriteParams) => {
  const { data } = await server.post<
    CommentWriteRequestData,
    BaseResponse<number>
  >({
    url: createPath(
      END_POINT.COMMENTS(boardId),
      parentId && `?parentId=${parentId}`,
    ),
    body,
  });

  return data;
};
/**
 * 댓글 삭제
 */
export const deleteComment = (id: number) => {
  return server.del<CommentWriteRequestData, BaseResponse<number>>({
    url: END_POINT.COMMENTS(id),
  });
};
