import { END_POINT, STORAGE_PERIOD } from '@constants/api';
import { createCommonPagination, createPath, getAccessToken } from '@utils/api';
import type { BaseResponse, IDType } from '@type/api';
import { server } from './server';
import type { AssignmentFileType } from '@type/activity';

interface postUploadedFileMembershipFeeArgs {
  storagePeriod: number;
  multipartFile: string;
}
interface postUploadedFileAssignmentArgs {
  groupId: IDType;
  groupBoardId: IDType;
  storagePeriod: number;
  files: FormData;
}

export const postUploadedFileMembershipFee = async ({
  storagePeriod,
  multipartFile,
}: postUploadedFileMembershipFeeArgs) => {
  const accessToken = getAccessToken();
  const params = { storagePeriod };
  const url = createCommonPagination(
    END_POINT.UPLOADEDFILE_MEMBERSHIP_FEE,
    params,
  );

  const { data } = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(multipartFile),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  return data;
};

// 활동 그룹 과제 업로드
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
