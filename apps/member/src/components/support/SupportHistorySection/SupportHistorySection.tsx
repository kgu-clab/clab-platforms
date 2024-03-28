import ListButton from '@components/common/ListButton/ListButton';
import Section from '@components/common/Section/Section';
import { useMembershipFee } from '@hooks/queries';
import { formattedDate } from '@utils/date';
import MembershipCategoryBadge from '@components/membership/MembershipCategoryBadge/MembershipCategoryBadge';
import MembershipStatusBadge from '@components/membership/MembershipStatusBadge/MembershipStatusBadge';

const SupportHistorySection = () => {
  const { data } = useMembershipFee();

  return (
    <Section>
      <Section.Header title="요청 내역" />
      <Section.Body>
        {data.items.map(({ id, category, status, content, createdAt }) => (
          <ListButton
            key={id}
            className="flex items-center justify-between text-nowrap"
          >
            <div className="pr-4 space-x-2 truncate grow">
              <MembershipCategoryBadge category={category} />
              <MembershipStatusBadge status={status} />
              <span>{content}</span>
            </div>
            <span>{formattedDate(createdAt)}</span>
          </ListButton>
        ))}
      </Section.Body>
    </Section>
  );
};

export default SupportHistorySection;
