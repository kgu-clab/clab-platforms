import { PaginationType } from '@type/api';
import { server } from './server';
import {
  createCommentsPagination,
  createPagination,
  createPath,
  getAccessToken,
} from '@utils/api';
import { API_BASE_URL, END_POINT } from '@constants/api';
import type {
  CommentItem,
  CommentListItem,
  CommentWriteItem,
} from '@type/comment';

interface commentWriteArgs {
  parentId?: number;
  boardId: number;
  body: CommentWriteItem;
}

// 나의 댓글 조회
export const getMyComments = async (page: number, size: number) => {
  const { data } = await server.get<PaginationType<CommentItem>>({
    url: createPagination(END_POINT.MY_COMMENTS, page, size),
  });

  return data;
};

export const getCommentList = async (
  id: number,
  page: number,
  size: number,
) => {
  const { data } = await server.get<PaginationType<CommentListItem>>({
    url: createCommentsPagination(END_POINT.COMMENTS(id), id, page, size),
  });
  return data;
};

export const postCommentWrite = async ({
  parentId,
  boardId,
  body,
}: commentWriteArgs) => {
  const accessToken = getAccessToken();
  let url = createPath(API_BASE_URL, END_POINT.COMMENTS(boardId));
  if (parentId) {
    url += `?parentId=${parentId}`;
  }

  const { data } = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  return data;
};

// export const postCommentWrite = async ({
//   parentId,
//   boardId,
//   body,
// }: commentWriteArgs) => {
//   const jsonRequestBody = JSON.stringify(body);
//   let url;
//   if (parentId) {
//     url = createRecommentsWrtiePagination(
//       END_POINT.COMMENTS(boardId),
//       parentId,
//       boardId,
//     );
//   } else {
//     url = createCommentsWrtiePagination(END_POINT.COMMENTS(boardId), boardId);
//   }
//   const { data } = await server.post<string, BaseResponse<number>>({
//     url: url,
//     body: jsonRequestBody,
//   });
//   return data;
// };
