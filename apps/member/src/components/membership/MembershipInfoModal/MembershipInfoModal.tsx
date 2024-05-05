import { DetailsList } from '@clab/design-system';

import Image from '@components/common/Image/Image';

import { createImageUrl } from '@utils/api';
import { formattedDate } from '@utils/date';
import { formatMemberName, formatWon } from '@utils/string';

import type { MembershipFeeType } from '@type/membershipFee';

import MembershipCategoryBadge from '../MembershipCategoryBadge/MembershipCategoryBadge';
import MembershipStatusBadge from '../MembershipStatusBadge/MembershipStatusBadge';

interface Props {
  data: MembershipFeeType;
  hasPermission?: boolean;
}

const MembershipInfoModal = ({ data, hasPermission = false }: Props) => {
  const {
    imageUrl,
    category,
    status,
    memberName,
    memberId,
    account,
    content,
    amount,
    createdAt,
  } = data;

  const handleImageClick = () => {
    window.open(createImageUrl(imageUrl), '_blank');
  };

  return (
    <div className="space-y-2">
      <div className="scrollbar-hide max-h-[480px] cursor-pointer overflow-auto rounded-lg border">
        <Image
          src={createImageUrl(imageUrl)}
          alt="증빙자료"
          onClick={handleImageClick}
        />
      </div>
      <DetailsList>
        <DetailsList.Item label="상태">
          <MembershipStatusBadge status={status} />
        </DetailsList.Item>
        <DetailsList.Item label="구분">
          <MembershipCategoryBadge category={category} />
        </DetailsList.Item>
        <DetailsList.Item label="내용">{content}</DetailsList.Item>
        {hasPermission && account && (
          <DetailsList.Item label="계좌">{account}</DetailsList.Item>
        )}
        <DetailsList.Item label="금액">
          {`₩${formatWon(amount)}`}
        </DetailsList.Item>
        <DetailsList.Item label="요청자">
          {hasPermission
            ? `${memberName} (${memberId})`
            : formatMemberName(memberName, memberId)}
        </DetailsList.Item>
        <DetailsList.Item label="신청일">
          {formattedDate(createdAt)}
        </DetailsList.Item>
      </DetailsList>
    </div>
  );
};

export default MembershipInfoModal;
