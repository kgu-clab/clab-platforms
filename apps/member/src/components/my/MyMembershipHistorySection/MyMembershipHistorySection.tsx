import ListButton from '@components/common/ListButton/ListButton';
import Section from '@components/common/Section/Section';
import useModal from '@hooks/common/useModal';
import { toYYMMDD } from '@utils/date';
import MembershipStatusBadge from '@components/membership/MembershipStatusBadge/MembershipStatusBadge';
import type { MembershipFeeType } from '@type/membershipFee';
import MembershipInfoModal from '@components/membership/MembershipInfoModal/MembershipInfoModal';

interface MyMembershipFeeProps {
  data: Array<MembershipFeeType>;
}

const TITLE = '회비 신청 내역';

const MyMembershipHistorySection = ({ data }: MyMembershipFeeProps) => {
  const { openModal } = useModal();
  /**
   * 회비 상세 내역을 모달을 통해서 보여줍니다.
   */
  const handleButtonClick = (membership: MembershipFeeType) => {
    openModal({
      title: TITLE,
      content: <MembershipInfoModal data={membership} />,
    });
  };

  return (
    <Section>
      <Section.Header title={TITLE} />
      <Section.Body className="text-sm">
        {data.map((membership) => (
          <ListButton
            key={membership.id}
            onClick={() => handleButtonClick(membership)}
          >
            <p className="pr-4 space-x-2 truncate grow">
              <MembershipStatusBadge status={membership.status} />
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
