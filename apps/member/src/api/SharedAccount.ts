import { END_POINT } from '@constants/api';
import { createCommonPagination, createPath } from '@utils/api';

import { BaseResponse, PaginationType } from '@type/api';
import type {
  AccountType,
  SharedAccountUsageType,
  SharedAccountUserItem,
} from '@type/sharedAccount';

import { server } from './server';

interface patchSharedAccountStatusArgs {
  usageId: number;
  status: string;
}

// 공동 계정 이용 신청
export const postSharedAccountUsage = async (body: SharedAccountUsageType) => {
  const url = createPath(END_POINT.SHARED_ACCOUNT) + `/usage`;
  const { data } = await server.post<
    SharedAccountUsageType,
    BaseResponse<number>
  >({
    url: url,
    body,
  });

  return data;
};

// 공동 계정 상태 변경
export const patchSharedAccountStatus = async ({
  usageId,
  status,
}: patchSharedAccountStatusArgs) => {
  const params = { usageId, status };
  const { data } = await server.patch<unknown, BaseResponse<number>>({
    url: createCommonPagination(
      END_POINT.SHARED_ACCOUNT_STATUS(usageId),
      params,
    ),
  });

  return data;
};

// 공동 계정 이용 조회
export const getSharedAccountUsage = async (page: number, size: number) => {
  const params = { page, size };
  const url = END_POINT.SHARED_ACCOUNT + `/usage`;
  const { data } = await server.get<PaginationType<SharedAccountUserItem>>({
    url: createCommonPagination(url, params),
  });

  return data;
};

// 공동 계정 조회
export const getSharedAccount = async (page: number, size: number) => {
  const params = { page, size };
  const { data } = await server.get<PaginationType<AccountType>>({
    url: createCommonPagination(END_POINT.SHARED_ACCOUNT, params),
  });

  return data;
};
