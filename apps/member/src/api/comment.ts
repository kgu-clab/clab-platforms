import { BaseResponse, PaginationType } from '@type/api';
import { server } from './server';
import { createCommonPagination, createPath } from '@utils/api';
import { END_POINT } from '@constants/api';
import type {
  CommentItem,
  CommentListItem,
  CommentWriteItem,
} from '@type/comment';

interface commentWriteArgs {
  parentId?: number;
  boardId: string;
  body: CommentWriteItem;
}

// 나의 댓글 조회
export const getMyComments = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<CommentItem>>({
    url: createCommonPagination(END_POINT.MY_COMMENTS, params),
  });

  return data;
};

// 댓글 목록 조회
export const getCommentList = async (
  id: string,
  page: number,
  size: number,
) => {
  const params = { id, page, size };
  const { data } = await server.get<PaginationType<CommentListItem>>({
    url: createCommonPagination(END_POINT.COMMENTS(id), params),
  });

  return data;
};

// 댓글 작성
export const postCommentWrite = async ({
  parentId,
  boardId,
  body,
}: commentWriteArgs) => {
  let url = createPath(END_POINT.COMMENTS(boardId));
  if (parentId) {
    url += `?parentId=${parentId}`;
  }

  const { data } = await server.post<CommentWriteItem, BaseResponse>({
    url,
    body,
  });

  return data;
};
