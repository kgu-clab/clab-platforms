import Image from '@components/common/Image/Image';
import { createImageUrl } from '@utils/api';
import MembershipCategoryBadge from '../MembershipCategoryBadge/MembershipCategoryBadge';
import MembershipStatusBadge from '../MembershipStatusBadge/MembershipStatusBadge';
import { formatWon } from '@utils/string';
import { formattedDate } from '@utils/date';
import type { MembershipFeeType } from '@type/membershipFee';

interface MembershipInfoModalProps {
  data: MembershipFeeType;
}

interface MembershipInfoModalUlProps {
  title?: string;
  children: React.ReactNode;
}

interface MembershipInfoModalLiProps {
  label: string;
  children: React.ReactNode;
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
      <div className="max-h-[480px] overflow-auto border rounded-lg scrollbar-hide">
        <Image src={createImageUrl(imageUrl)} alt="증빙자료" />
      </div>

      <div className="space-x-2"></div>
      <MembershipInfoModal.Ul>
        <MembershipInfoModal.Li label="상태">
          <MembershipStatusBadge status={status} />
        </MembershipInfoModal.Li>
        <MembershipInfoModal.Li label="구분">
          <MembershipCategoryBadge category={category} />
        </MembershipInfoModal.Li>
        <MembershipInfoModal.Li label="내용">{content}</MembershipInfoModal.Li>
        <MembershipInfoModal.Li label="금액">
          {`₩${formatWon(amount)}`}
        </MembershipInfoModal.Li>
        <MembershipInfoModal.Li label="요청자">
          {`${memberName} (${memberId})`}
        </MembershipInfoModal.Li>
        <MembershipInfoModal.Li label="신청일">
          {formattedDate(createdAt)}
        </MembershipInfoModal.Li>
      </MembershipInfoModal.Ul>
    </div>
  );
};

MembershipInfoModal.Ul = ({ title, children }: MembershipInfoModalUlProps) => {
  return (
    <ul className="p-4 leading-loose text-black bg-gray-100 rounded-lg">
      {title && <h2 className="pb-4 text-lg font-semibold">{title}</h2>}
      {children}
    </ul>
  );
};

MembershipInfoModal.Li = ({ label, children }: MembershipInfoModalLiProps) => {
  return (
    <li className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span className="font-semibold text-right truncate grow">{children}</span>
    </li>
  );
};

export default MembershipInfoModal;
