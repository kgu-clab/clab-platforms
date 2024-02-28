import { END_POINT } from '@constants/api';
import { createCommonPagination, createPath, getAccessToken } from '@utils/api';
import { server } from './server';
import { BaseResponse } from '@type/api';
import type { ProfileImageFileType } from '@type/uploadFile';

interface postUploadedFileMembershipFeeArgs {
  storagePeriod: number;
  multipartFile: string;
}
interface postUploadedFileProfileImageArgs {
  memberId: string;
  storagePeriod: number;
  multipartFile: FormData;
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
  console.log('image stored');

  return data;
};

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
