import { createPagination } from '@clab-platforms/utils';

import { END_POINT } from '@constants/api';

import type {
  BaseResponse,
  ResponsePagination,
  WithPaginationParams,
} from '@type/api';
import type {
  Support,
  SupportAnswerFormItem,
  SupportDetail,
  SupportWriteFormItem,
} from '@type/support';

import { server } from './server';
import {
  postFilesSupportImages,
  postUploadedFileBoard,
  uploadFiles,
} from './uploadedFile';

export interface PostSupportsWriteParams extends SupportWriteFormItem {
  file?: File;
}
export interface PatchSupportsParams extends SupportWriteFormItem {
  id: number;
  file?: File;
}
export interface PostAnswersParams extends SupportAnswerFormItem {
  id: number;
}
export interface PatchAnswersParams extends SupportAnswerFormItem {
  id: number;
}

/**
 * 내가 작성한 문의 조회
 */
export async function getMySupports({ page, size }: WithPaginationParams) {
  const { data } = await server.get<ResponsePagination<Support>>({
    url: createPagination(END_POINT.MY_SUPPORTS, { page, size }),
  });

  return data;
}

/**
 * 문의 목록 조회
 */
export async function getSupportList({ page, size }: WithPaginationParams) {
  const { data } = await server.get<ResponsePagination<Support>>({
    url: createPagination(END_POINT.SUPPORTS, { page, size }),
  });
  return data;
}

/**
 * 문의 작성
 */
export async function postSupportsWrite(data: PostSupportsWriteParams) {
  if (data.file) {
    const files = await uploadFiles([data.file], postUploadedFileBoard);
    if (!files?.[0]?.fileUrl) {
      throw new Error('파일 업로드에 실패했습니다.');
    }
    data.imageUrl = files[0].fileUrl;
  }

  return server.post<SupportWriteFormItem, BaseResponse<number>>({
    url: END_POINT.SUPPORTS,
    body: data,
  });
}

/**
 * 문의 상세 조회
 */
export function getSupportsDetail(id: number) {
  return server.get<BaseResponse<SupportDetail>>({
    url: END_POINT.SUPPORTS_ITEM(id),
  });
}

/**
 * 문의 수정
 */
export async function patchSupports({
  id,
  file,
  ...data
}: PatchSupportsParams) {
  if (file) {
    const uploadedFile = await uploadFiles([file], postFilesSupportImages);
    if (!uploadedFile?.[0]?.fileUrl) {
      throw new Error('파일 업로드에 실패했습니다.');
    }
    data.imageUrl = uploadedFile[0].fileUrl;
  }

  return server.patch<SupportWriteFormItem, BaseResponse<number>>({
    url: END_POINT.SUPPORTS_ITEM(id),
    body: data,
  });
}

/**
 * 문의 삭제
 */
export function deleteSupports(id: number) {
  return server.del<never, BaseResponse<number>>({
    url: END_POINT.SUPPORTS_ITEM(id),
  });
}

/**
 * 답변 작성
 */
export async function postAnswersWrite({ id, ...data }: PostAnswersParams) {
  return server.post<SupportAnswerFormItem, BaseResponse<number>>({
    url: END_POINT.ANSWERS_ITEM(id),
    body: data,
  });
}

/**
 * 답변 수정
 */
export async function patchAnswers({ id, ...data }: PatchAnswersParams) {
  return server.patch<SupportAnswerFormItem, BaseResponse<number>>({
    url: END_POINT.ANSWERS_ITEM(id),
    body: data,
  });
}
