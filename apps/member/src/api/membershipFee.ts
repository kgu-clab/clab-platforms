import { server } from './server';
import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';
import { postUploadedFileMembershipFee } from './uploadedFile';
import type { ArgsWithFiles, BaseResponse, PaginationType } from '@type/api';
import type { MembershipFeeType } from '@type/membershipFee';

interface postMembershipFeeArgs extends ArgsWithFiles {
  body: MembershipFeeType;
}

/**
 * 회비 신청 정보 조회
 */
export const getMembershipFee = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<MembershipFeeType>>({
    url: createCommonPagination(END_POINT.MEMBERSHIP_FEE, params),
  });
  return data;
};

/**
 * 회비 신청
 */
export const postMembershipFee = async ({
  body,
  multipartFile,
}: postMembershipFeeArgs) => {
  if (multipartFile) {
    const data = await postUploadedFileMembershipFee({
      storagePeriod: 365,
      multipartFile: multipartFile,
    });

    body['imageUrl'] = data[0].fileUrl;
  }

  const { data } = await server.post<MembershipFeeType, BaseResponse<number>>({
    url: END_POINT.MEMBERSHIP_FEE,
    body: body,
  });

  return data;
};
