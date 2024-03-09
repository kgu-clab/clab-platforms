import { server } from './server';
import { END_POINT, STORAGE_PERIOD } from '@constants/api';
import { createPath } from '@utils/api';
import { ProfileImageFileType } from '@type/uploadFile';
import type { AssignmentFileType } from '@type/activity';
import type { BaseResponse, IDType } from '@type/api';

interface postUploadedFileMembershipFeeArgs {
  storagePeriod: number;
  multipartFile: FormData;
}

interface postUploadedFileAssignmentArgs {
  groupId: IDType;
  groupBoardId: IDType;
  storagePeriod: number;
  files: FormData;
}

interface postUploadedFileProfileImageArgs {
  memberId: number;
  storagePeriod: number;
  multipartFile: FormData;
}

/**
 * 회비 증빙 사진 업로드
 */
export const postUploadedFileMembershipFee = async ({
  storagePeriod,
  multipartFile,
}: postUploadedFileMembershipFeeArgs) => {
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
}: postUploadedFileAssignmentArgs) => {
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
export const postUploadedFileProfileImage = async ({
  memberId,
  storagePeriod,
  multipartFile,
}: postUploadedFileProfileImageArgs) => {
  const url =
    createPath(END_POINT.UPLOADEDFILE_PROFILES(memberId)) +
    `?storagePeriod=${storagePeriod}`;
  const { data } = await server.post<
    FormData,
    BaseResponse<ProfileImageFileType>
  >({
    url,
    body: multipartFile,
  });

  return data;
};
