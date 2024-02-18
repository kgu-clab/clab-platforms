import { API_BASE_URL, END_POINT } from '@constants/api';
import { createCommonPagination, createPath, getAccessToken } from '@utils/api';
import { patchActivityBoard, postActivityBoard } from './activity';

interface postUploadedFileMembershipFeeArgs {
  storagePeriod: number;
  multipartFile: string;
}
interface postUploadedFileAssignemntArgs {
  body: {
    activityGroupId: number;
    activityGroupBoard: number;
    memberId: string;
    storagePeriod: number;
  };
  multipartFile: FormData;
  change: boolean;
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

export const postUploadedFileAssignment = async ({
  body,
  multipartFile,
  change,
}: postUploadedFileAssignemntArgs) => {
  const accessToken = getAccessToken();
  const storagePeriod = 7;
  const url = createPath(
    API_BASE_URL,
    END_POINT.UPLOADEDFILE_ACTIVITY_ASSIGNMENT(
      body.activityGroupId,
      body.activityGroupBoard,
      body.memberId,
    ),
  );
  const addUrl = `${url}?storagePeriod=${storagePeriod}`;
  const { data: SubmitFileType } = await fetch(addUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: multipartFile,
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
  const boardBody = {
    category: 'SUBMIT',
    fileUrls: [SubmitFileType[0].fileUrl],
  };
  change
    ? patchActivityBoard({
        activityGroupBoardId: body.activityGroupBoard,
        body: boardBody,
      })
    : postActivityBoard({
        parentId: body.activityGroupBoard,
        activityGroupId: body.activityGroupId,
        body: boardBody,
      });
  return SubmitFileType;
};
