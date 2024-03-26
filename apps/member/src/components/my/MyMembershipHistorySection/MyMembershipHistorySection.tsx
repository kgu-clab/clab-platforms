import Image from '@components/common/Image/Image';
import ListButton from '@components/common/ListButton/ListButton';
import Section from '@components/common/Section/Section';
import useModal from '@hooks/common/useModal';
import { createImageUrl } from '@utils/api';
import { toYYMMDD } from '@utils/date';
import { formatWon } from '@utils/string';
import type { MembershipFeeType } from '@type/membershipFee';
import { Badge } from '@clab/design-system';

interface MyMembershipFeeProps {
  data: Array<MembershipFeeType>;
}

const title = '회비 신청 내역';

const MyMembershipHistorySection = ({ data }: MyMembershipFeeProps) => {
  const { openModal } = useModal();

  const onClickShow = (membership: MembershipFeeType) => {
    openModal({
      title: title,
      content: (
        <div className="space-y-2">
          <Image
            src={createImageUrl(membership.imageUrl || '')}
            className="border rounded-lg"
            alt="증빙자료"
          />
          <ul className="space-y-2 text-black">
            <li className="space-x-2">
              <Badge color="blue">{membership.category.toUpperCase()}</Badge>
              <Badge color="yellow">대기</Badge>
            </li>
            <li>내용: {membership.content}</li>
            <li>금액: ₩{formatWon(membership.amount)}</li>
            <li>신청일: {toYYMMDD(membership.createdAt)}</li>
          </ul>
        </div>
      ),
    });
  };

  return (
    <Section>
      <Section.Header title={title} />
      <Section.Body className="text-sm">
        {data.map((membership) => (
          <ListButton
            key={membership.id}
            onClick={() => onClickShow(membership)}
          >
            <p className="pr-4 space-x-2 truncate grow">
              <Badge color="blue">{membership.category.toUpperCase()}</Badge>
              <span>{membership.content}</span>
            </p>
            <p className="text-clab-main-light">
              {toYYMMDD(membership.createdAt)}
            </p>
          </ListButton>
        ))}
      </Section.Body>
    </Section>
  );
};

export default MyMembershipHistorySection;
