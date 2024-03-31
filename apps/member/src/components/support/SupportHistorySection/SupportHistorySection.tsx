import Section from '@components/common/Section/Section';
import { useMembershipFee } from '@hooks/queries';
import { formattedDate } from '@utils/date';
import MembershipStatusBadge from '@components/membership/MembershipStatusBadge/MembershipStatusBadge';
import useModal from '@hooks/common/useModal';
import MembershipInfoModal from '@components/membership/MembershipInfoModal/MembershipInfoModal';
import Table from '@components/common/Table/Table';
import type { MembershipFeeType } from '@type/membershipFee';
import { TABLE_HEAD } from '@constants/head';

const SupportHistorySection = () => {
  const { openModal } = useModal();
  const { data } = useMembershipFee();
  /**
   * 회비 상세 내역을 모달을 통해서 보여줍니다.
   */
  const handleButtonClick = (membership: MembershipFeeType) => {
    openModal({
      title: '회비 상세 내역',
      content: <MembershipInfoModal data={membership} />,
    });
  };

  return (
    <Section>
      <Section.Header title="신청 내역">
        최근에 신청된 회비 신청 내역이에요
      </Section.Header>
      <Section.Body>
        <Table head={TABLE_HEAD.SUPPORT_HISTORY}>
          {data.items.map((membership) => (
            <Table.Row
              key={membership.id}
              onClick={() => handleButtonClick(membership)}
            >
              <Table.Cell>{membership.id}</Table.Cell>
              <Table.Cell>
                <MembershipStatusBadge status={membership.status} />
              </Table.Cell>
              <Table.Cell> {membership.category}</Table.Cell>
              <Table.Cell>
                {membership.memberName} ({membership.memberId})
              </Table.Cell>
              <Table.Cell>{formattedDate(membership.createdAt)}</Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </Section.Body>
    </Section>
  );
};

export default SupportHistorySection;
