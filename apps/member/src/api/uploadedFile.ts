import { END_POINT, STORAGE_PERIOD } from '@constants/api';
import { createPath } from '@utils/api';

import type { AssignmentFileType } from '@type/activity';
import type { BaseResponse, IDType } from '@type/api';
import { ProfileImageFileType } from '@type/uploadFile';

import { server } from './server';

interface PostUploadedFileMembershipFee {
  storagePeriod: number;
  multipartFile: FormData;
}

interface PostUploadedFileAssignment {
  groupId: IDType;
  groupBoardId: IDType;
  storagePeriod: number;
  files: FormData;
}
/**
 * 회비 증빙 사진 업로드
 */
export const postUploadedFileMembershipFee = async ({
  storagePeriod,
  multipartFile,
}: PostUploadedFileMembershipFee) => {
  const url = createPath(
    END_POINT.UPLOADEDFILE_MEMBERSHIP_FEE,
    STORAGE_PERIOD(storagePeriod),
  );
  const { data } = await server.post<
    FormData,
    BaseResponse<AssignmentFileType[]>
  >({
    url: url,
    body: multipartFile,
  });

  return data;
};
/**
 * 활동 그룹 과제 업로드
 */
export const postUploadedFileAssignment = async ({
  groupId,
  groupBoardId,
  storagePeriod,
  files,
}: PostUploadedFileAssignment) => {
  const url = createPath(
    END_POINT.UPLOADEDFILE_ACTIVITY_ASSIGNMENT(groupId, groupBoardId),
    STORAGE_PERIOD(storagePeriod),
  );
  const { data } = await server.post<
    FormData,
    BaseResponse<AssignmentFileType[]>
  >({
    url,
    body: files,
  });

  return data;
};
/**
 * 멤버 프로필 사진 업로드
 */
export const postUploadedFileProfileImage = async (multipartFile: FormData) => {
  const { data } = await server.post<
    FormData,
    BaseResponse<ProfileImageFileType>
  >({
    url: createPath(END_POINT.UPLOADEDFILE_PROFILES, STORAGE_PERIOD()),
    body: multipartFile,
  });

  return data;
};
/**
 * 함께하는 활동 사진 업로드
 */
export const postFilesActivityPhotos = async (multipartFile: FormData) => {
  const { data } = await server.post<
    FormData,
    BaseResponse<AssignmentFileType[]>
  >({
    url: createPath(END_POINT.UPLOADEDFILE_ACTIVITY_PHOTO, STORAGE_PERIOD()),
    body: multipartFile,
  });

  return data;
};
