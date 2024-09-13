import { createURL } from '@clab-platforms/utils';

import { END_POINT, FORM_DATA_KEY, STORAGE_PERIOD } from '@constants/api';

import type { BaseResponse, ResponseFile } from '@type/api';

import { server } from './server';

interface PostUploadedFileAssignmentParams {
  groupId: number;
  groupBoardId: number;
  files: FormData;
}
interface PostUploadedFileWeeklyParams {
  groupId: number;
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
    url: createURL(END_POINT.UPLOADEDFILE_BOARD, STORAGE_PERIOD(3)), // 게시글 파일은 3년간 보관
    body: multipartFile,
  });

  return data;
}
/**
 * 회비 증빙 사진 업로드
 */
export async function postUploadedFileMembershipFee(multipartFile: FormData) {
  const url = createURL(
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
 * 멤버 프로필 사진 업로드
 */
export async function postUploadedFileProfileImage(multipartFile: FormData) {
  const { data } = await server.post<FormData, BaseResponse<ResponseFile>>({
    url: createURL(END_POINT.UPLOADEDFILE_PROFILES, STORAGE_PERIOD(6)), // 프로필 사진은 6년간 보관
    body: multipartFile,
  });

  return data;
}
/**
 * 함께하는 활동 사진 업로드
 */
export async function postFilesActivityPhotos(multipartFile: FormData) {
  const { data } = await server.post<FormData, BaseResponse<ResponseFile[]>>({
    url: createURL(END_POINT.UPLOADEDFILE_ACTIVITY_PHOTO, STORAGE_PERIOD(10)), // 함께하는 활동 사진은 10년간 보관
    body: multipartFile,
  });

  return data;
}
/**
 * 활동 그룹 주차별활동 파일 업로드
 */
export async function postUploadedFileWeekly({
  groupId,
  files,
}: PostUploadedFileWeeklyParams) {
  const url = createURL(
    END_POINT.UPLOADEDFILE_ACTIVITY_WEEKLY(groupId),
    STORAGE_PERIOD(3), // 활동 주차별활동 파일은 3년간 보관
  );
  const { data } = await server.post<FormData, BaseResponse<ResponseFile[]>>({
    url,
    body: files,
  });

  return data;
}
/**
 * 활동 그룹 공지사항 파일 업로드
 */
export async function postUploadedFileNotice({
  groupId,
  files,
}: PostUploadedFileWeeklyParams) {
  const url = createURL(
    END_POINT.UPLOADEDFILE_ACTIVITY_NOTICE(groupId),
    STORAGE_PERIOD(3), // 활동 공지사항 파일은 3년간 보관
  );
  const { data } = await server.post<FormData, BaseResponse<ResponseFile[]>>({
    url,
    body: files,
  });

  return data;
}
/**
 * 활동 그룹 과제 파일 업로드
 */
export async function postUploadedFileAssignment({
  groupId,
  files,
}: PostUploadedFileWeeklyParams) {
  const url = createURL(
    END_POINT.UPLOADEDFILE_ACTIVITY_ASSIGNMENT(groupId),
    STORAGE_PERIOD(3), // 활동 과제 파일은 3년간 보관
  );
  const { data } = await server.post<FormData, BaseResponse<ResponseFile[]>>({
    url,
    body: files,
  });

  return data;
}
/**
 * 활동 그룹 과제 제출물 업로드
 */
export async function postUploadedFileSubmit({
  groupId,
  groupBoardId,
  files,
}: PostUploadedFileAssignmentParams) {
  const url = createURL(
    END_POINT.UPLOADEDFILE_ACTIVITY_SUBMIT(groupId, groupBoardId),
    STORAGE_PERIOD(3), // 활동 과제 제출물 파일은 3년간 보관
  );
  const { data } = await server.post<FormData, BaseResponse<ResponseFile[]>>({
    url,
    body: files,
  });

  return data;
}
