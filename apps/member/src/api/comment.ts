import { createPagination, createURL } from '@clab-platforms/utils';

import { END_POINT } from '@constants/api';

import type { BaseResponse, ResponsePagination } from '@type/api';
import type { CommentItem, CommentListItem } from '@type/comment';

import { server } from './server';

interface CommentWriteRequestData {
  content: string;
  wantAnonymous: boolean;
}

export interface PostCommentWriteParams {
  parentId?: number;
  boardId: number;
  body: CommentWriteRequestData;
}
/**
 * 나의 댓글 조회
 */
export const getMyComments = async (page: number, size: number) => {
  const { data } = await server.get<ResponsePagination<CommentItem>>({
    url: createPagination(END_POINT.MY_COMMENTS, {
      page,
      size,
    }),
  });

  return data;
};
/**
 * 댓글 목록 조회
 */
export const getComments = async (id: number, page: number, size: number) => {
  const params = { id, page, size };
  const { data } = await server.get<ResponsePagination<CommentListItem>>({
    url: createPagination(END_POINT.COMMENTS(id), params),
  });

  return data;
};
/**
 * 댓글 작성
 */
export const postCommentWrite = ({
  parentId,
  boardId,
  body,
}: PostCommentWriteParams) => {
  return server.post<CommentWriteRequestData, BaseResponse<number>>({
    url: createURL(
      END_POINT.COMMENTS(boardId),
      parentId && `?parentId=${parentId}`,
    ),
    body,
  });
};
/**
 * 댓글 삭제
 */
export const deleteComment = (id: number) => {
  return server.del<CommentWriteRequestData, BaseResponse<number>>({
    url: END_POINT.COMMENTS(id),
  });
};

/**
 * 댓글 좋아요 누르기/취소하기
 */
export const postCommentLikes = (commentId: number) => {
  return server.post<number, BaseResponse<number>>({
    url: END_POINT.COMMENTS_LIKES(commentId),
  });
};
