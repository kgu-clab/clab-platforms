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
  content: string;
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
      <Image
        src={createImageUrl(imageUrl)}
        className="border rounded-lg"
        alt="증빙자료"
      />
      <div className="space-x-2">
        <MembershipCategoryBadge category={category} />
        <MembershipStatusBadge status={status} />
      </div>
      <MembershipInfoModal.Ul>
        <MembershipInfoModal.Li
          label="요청자"
          content={`${memberName} (${memberId})`}
        />
        <MembershipInfoModal.Li label="내용" content={content} />
        <MembershipInfoModal.Li
          label="금액"
          content={`₩${formatWon(amount)}`}
        />
        <MembershipInfoModal.Li
          label="신청일"
          content={formattedDate(createdAt)}
        />
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

MembershipInfoModal.Li = ({ label, content }: MembershipInfoModalLiProps) => {
  return (
    <li className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span className="font-semibold text-right truncate grow">{content}</span>
    </li>
  );
};

export default MembershipInfoModal;
