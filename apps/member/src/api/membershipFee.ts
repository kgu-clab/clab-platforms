import { API_BASE_URL, END_POINT } from '@constants/api';
import { PaginationType } from '@type/api';
import type { MembershipFeeType } from '@type/membershipFee';
import { createCommonPagination, createPath, getAccessToken } from '@utils/api';
import { server } from './server';

interface postMembershipFeeArgs {
  body: MembershipFeeType;
  multipartFile?: FormData;
}

export const postMembershipFee = async ({
  body,
  multipartFile,
}: postMembershipFeeArgs) => {
  const accessToken = getAccessToken();
  let membershipFeeData;

  if (multipartFile) {
    const storagePeriod = 7;
    const url = createPath(API_BASE_URL, END_POINT.UPLOADEDFILE_MEMBERSHIP_FEE);
    const addUrl = `${url}?storagePeriod=${storagePeriod}`;
    const { data: imageData } = await fetch(addUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: multipartFile,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch((e) => console.error(e));
    console.log('이미지 저장 완료');

    membershipFeeData = {
      ...body,
      imageUrl: imageData[0],
    };
  } else {
    membershipFeeData = body;
  }

  const { data } = await fetch(
    createPath(API_BASE_URL, END_POINT.MEMBERSHIP_FEE),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(membershipFeeData),
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  return data;
};

export const getMembershipFee = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<MembershipFeeType>>({
    url: createCommonPagination(END_POINT.MEMBERSHIP_FEE, params),
  });
  return data;
};
