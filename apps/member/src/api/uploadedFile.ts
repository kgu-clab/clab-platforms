import { END_POINT, FORM_DATA_KEY, STORAGE_PERIOD } from '@constants/api';
import { createPath } from '@utils/api';

import type { BaseResponse, ResponseFile } from '@type/api';

import { server } from './server';

interface PostUploadedFileAssignmentParams {
  groupId: number;
  groupBoardId: number;
  files: FormData;
}

/**
 * 파일 업로드
 * @param files 업로드할 파일
 * @param uploadedFetch 업로드할 파일을 전송하는 함수
 */
export async function uploadFiles<T>(
  files: File[],
  uploadedFetch: (multipartFile: FormData) => Promise<T>,
) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append(FORM_DATA_KEY, file);
  });

  return uploadedFetch(formData);
}

/**
 * 게시글 파일 업로드
 */
export async function postUploadedFileBoard(multipartFile: FormData) {
  const { data } = await server.post<FormData, BaseResponse<ResponseFile[]>>({
    url: createPath(END_POINT.UPLOADEDFILE_BOARD, STORAGE_PERIOD(3)), // 게시글 파일은 3년간 보관
    body: multipartFile,
  });

  return data;
}
/**
 * 회비 증빙 사진 업로드
 */
export async function postUploadedFileMembershipFee(multipartFile: FormData) {
  const url = createPath(
    END_POINT.UPLOADEDFILE_MEMBERSHIP_FEE,
    STORAGE_PERIOD(5), // 회비 증빙 사진은 5년간 보관
  );
  const { data } = await server.post<FormData, BaseResponse<ResponseFile[]>>({
    url: url,
    body: multipartFile,
  });

  return data;
}
/**
 * 활동 그룹 과제 업로드
 */
export async function postUploadedFileAssignment({
  groupId,
  groupBoardId,
  files,
}: PostUploadedFileAssignmentParams) {
  const url = createPath(
    END_POINT.UPLOADEDFILE_ACTIVITY_ASSIGNMENT(groupId, groupBoardId),
    STORAGE_PERIOD(3), // 활동 과제 파일은 3년간 보관
  );
  const { data } = await server.post<FormData, BaseResponse<ResponseFile[]>>({
    url,
    body: files,
  });

  return data;
}
/**
 * 멤버 프로필 사진 업로드
 */
export async function postUploadedFileProfileImage(multipartFile: FormData) {
  const { data } = await server.post<FormData, BaseResponse<ResponseFile>>({
    url: createPath(END_POINT.UPLOADEDFILE_PROFILES, STORAGE_PERIOD(6)), // 프로필 사진은 6년간 보관
    body: multipartFile,
  });

  return data;
}
/**
 * 함께하는 활동 사진 업로드
 */
export async function postFilesActivityPhotos(multipartFile: FormData) {
  const { data } = await server.post<FormData, BaseResponse<ResponseFile[]>>({
    url: createPath(END_POINT.UPLOADEDFILE_ACTIVITY_PHOTO, STORAGE_PERIOD(10)), // 함께하는 활동 사진은 10년간 보관
    body: multipartFile,
  });

  return data;
}
