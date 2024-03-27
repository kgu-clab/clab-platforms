import { server } from './server';
import { END_POINT } from '@constants/api';
import { createCommonPagination } from '@utils/api';
import { postUploadedFileMembershipFee } from './uploadedFile';
import type {
  ArgsWithFiles,
  BaseResponse,
  PaginationPramsType,
  PaginationType,
} from '@type/api';
import type { MembershipFeeType } from '@type/membershipFee';

interface MembershipFeeRequestType
  extends Omit<MembershipFeeType, 'createdAt'> {}

interface GetMembershipFeeParamsType extends PaginationPramsType {
  memberId?: string;
  memberName?: string;
  category?: string;
}

interface PostMembershipFeePramsType extends ArgsWithFiles {
  body: MembershipFeeRequestType;
}
/**
 * 회비 정보 조회
 */
export const getMembershipFee = async ({
  memberId,
  memberName,
  category,
  page,
  size,
}: GetMembershipFeeParamsType) => {
  const params = { memberId, memberName, category, page, size };
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
}: PostMembershipFeePramsType) => {
  if (multipartFile) {
    const data = await postUploadedFileMembershipFee({
      storagePeriod: 365,
      multipartFile: multipartFile,
    });

    body['imageUrl'] = data[0].fileUrl;
  }

  const { data } = await server.post<
    MembershipFeeRequestType,
    BaseResponse<number>
  >({
    url: END_POINT.MEMBERSHIP_FEE,
    body: body,
  });

  return data;
};
