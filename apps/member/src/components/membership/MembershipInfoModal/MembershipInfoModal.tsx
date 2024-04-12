import { DetailsList } from '@clab/design-system';

import Image from '@components/common/Image/Image';

import { createImageUrl } from '@utils/api';
import { formattedDate } from '@utils/date';
import { formatWon } from '@utils/string';

import type { MembershipFeeType } from '@type/membershipFee';

import MembershipCategoryBadge from '../MembershipCategoryBadge/MembershipCategoryBadge';
import MembershipStatusBadge from '../MembershipStatusBadge/MembershipStatusBadge';

interface MembershipInfoModalProps {
  data: MembershipFeeType;
}

const MembershipInfoModal = ({ data }: MembershipInfoModalProps) => {
  const {
    imageUrl,
    category,
    status,
    memberName,
    memberId,
    content,
    amount,
    createdAt,
  } = data;

  return (
    <div className="space-y-2">
      <div className="scrollbar-hide max-h-[480px] overflow-auto rounded-lg border">
        <Image src={createImageUrl(imageUrl)} alt="증빙자료" />
      </div>

      <div className="space-x-2"></div>
      <DetailsList>
        <DetailsList.Item label="상태">
          <MembershipStatusBadge status={status} />
        </DetailsList.Item>
        <DetailsList.Item label="구분">
          <MembershipCategoryBadge category={category} />
        </DetailsList.Item>
        <DetailsList.Item label="내용">{content}</DetailsList.Item>
        <DetailsList.Item label="금액">
          {`₩${formatWon(amount)}`}
        </DetailsList.Item>
        <DetailsList.Item label="요청자">
          {`${memberName} (${memberId})`}
        </DetailsList.Item>
        <DetailsList.Item label="신청일">
          {formattedDate(createdAt)}
        </DetailsList.Item>
      </DetailsList>
    </div>
  );
};

export default MembershipInfoModal;
