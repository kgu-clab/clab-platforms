import { END_POINT } from '@constants/api';
import { createCommonPagination, getAccessToken } from '@utils/api';

interface postUploadedFileMembershipFeeArgs {
  storagePeriod: number;
  multipartFile: string;
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
