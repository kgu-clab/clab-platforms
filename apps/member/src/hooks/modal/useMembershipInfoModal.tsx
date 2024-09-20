import { useMemo } from 'react';

import { DetailsList } from '@clab-platforms/design-system';
import { formatWon } from '@clab-platforms/utils';

import Image from '@components/common/Image/Image';
import MembershipCategoryBadge from '@components/membership/MembershipCategoryBadge/MembershipCategoryBadge';
import MembershipStatusBadge from '@components/membership/MembershipStatusBadge/MembershipStatusBadge';

import { MODAL_TITLE } from '@constants/modal';
import { UseModalResult, useModal } from '@hooks/common/useModal';
import { useMembershipFeeModifyMutation } from '@hooks/queries/useMembershipFeeModifyMutation';
import { createImageUrl } from '@utils/api';
import { formattedDate } from '@utils/date';
import { formatMemberName } from '@utils/string';

import type { MembershipFeeType } from '@type/membershipFee';

interface Options {
  data: MembershipFeeType;
  isOwner?: boolean;
  hasPermission?: boolean;
}

/**
 * 회비 정보 모달을 엽니다.
 * 관리자 권한일 경우 승인과 반려처리를 할 수 있습니다.
 */
export function useMembershipInfoModal(): UseModalResult<Options> {
  const { open } = useModal();
  const { membershipFeeModifyMutate } = useMembershipFeeModifyMutation();

  return useMemo(
    () => ({
      open: (options: Options) =>
        open({
          title: MODAL_TITLE.SUPPORT_HISTORY,
          content: <MembershipInfoModal {...options} />,
          accept: options.hasPermission
            ? {
                text: '승인',
                onClick: () => {
                  membershipFeeModifyMutate({
                    id: options.data.id,
                    body: {
                      status: 'APPROVED',
                    },
                  });
                },
              }
            : undefined,
          cancel: options.hasPermission
            ? {
                text: '반려',
                onClick: () => {
                  membershipFeeModifyMutate({
                    id: options.data.id,
                    body: {
                      status: 'REJECTED',
                    },
                  });
                },
              }
            : undefined,
        }),
    }),
    [membershipFeeModifyMutate, open],
  );
}

interface Props extends Options {}

const MembershipInfoModal = ({
  data,
  isOwner = false,
  hasPermission = false,
}: Props) => {
  const isMasking = isOwner === false && hasPermission === false;

  const handleImageClick = () => {
    window.open(createImageUrl(data.imageUrl), '_blank');
  };

  return (
    <div className="space-y-2">
      <div className="scrollbar-hide max-h-[480px] cursor-pointer overflow-auto rounded-lg border">
        <Image
          src={createImageUrl(data.imageUrl)}
          alt="증빙자료"
          onClick={handleImageClick}
        />
      </div>
      <DetailsList>
        <DetailsList.Item label="상태">
          <MembershipStatusBadge status={data.status} />
        </DetailsList.Item>
        <DetailsList.Item label="구분">
          <MembershipCategoryBadge category={data.category} />
        </DetailsList.Item>
        <DetailsList.Item label="내용">{data.content}</DetailsList.Item>
        {!isMasking && data.account && (
          <DetailsList.Item label="계좌">{data.account}</DetailsList.Item>
        )}
        <DetailsList.Item label="금액">
          {`₩${formatWon(data.amount)}`}
        </DetailsList.Item>
        <DetailsList.Item label="요청자">
          {!isMasking
            ? `${data.memberName} (${data.memberId})`
            : formatMemberName(data.memberName, data.memberId)}
        </DetailsList.Item>
        <DetailsList.Item label="신청일">
          {formattedDate(data.createdAt)}
        </DetailsList.Item>
      </DetailsList>
    </div>
  );
};
