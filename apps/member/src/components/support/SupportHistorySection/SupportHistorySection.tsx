import ListButton from '@components/common/ListButton/ListButton';
import Section from '@components/common/Section/Section';
import { useMembershipFee } from '@hooks/queries';
import { formattedDate } from '@utils/date';
import MembershipCategoryBadge from '@components/membership/MembershipCategoryBadge/MembershipCategoryBadge';
import MembershipStatusBadge from '@components/membership/MembershipStatusBadge/MembershipStatusBadge';
import useModal from '@hooks/common/useModal';
import MembershipInfoModal from '@components/membership/MembershipInfoModal/MembershipInfoModal';
import type { MembershipFeeType } from '@type/membershipFee';

const SupportHistorySection = () => {
  const { openModal } = useModal();
  const { data } = useMembershipFee();

  const handleButtonClick = (membership: MembershipFeeType) => {
    openModal({
      title: '회비 요청 내역',
      content: <MembershipInfoModal data={membership} />,
    });
  };

  return (
    <Section>
      <Section.Header title="요청 내역" />
      <Section.Body>
        {data.items.map((membership) => (
          <ListButton
            key={membership.id}
            className="flex items-center justify-between text-nowrap"
            onClick={() => handleButtonClick(membership)}
          >
            <div className="pr-4 space-x-2 truncate grow">
              <MembershipCategoryBadge category={membership.category} />
              <MembershipStatusBadge status={membership.status} />
              <span>{membership.content}</span>
            </div>
            <span>{formattedDate(membership.createdAt)}</span>
          </ListButton>
        ))}
      </Section.Body>
    </Section>
  );
};

export default SupportHistorySection;
