import { Table } from '@clab-platforms/design-system';

import Pagination from '@components/common/Pagination/Pagination';
import Section from '@components/common/Section/Section';
import MembershipStatusBadge from '@components/membership/MembershipStatusBadge/MembershipStatusBadge';

import { TABLE_HEAD } from '@constants/head';
import { ROLE_LEVEL } from '@constants/state';
import { usePagination } from '@hooks/common/usePagination';
import { useMembershipInfoModal } from '@hooks/modal/useMembershipInfoModal';
import { useMembershipFee, useMyProfile } from '@hooks/queries';
import { formattedDate } from '@utils/date';
import { formatMemberName } from '@utils/string';

interface Props {
  title?: string;
  size?: number;
  withPagination?: boolean;
  hasPermission?: boolean;
}

const SupportHistorySection = ({
  title,
  size: defaultSize,
  withPagination,
  hasPermission = false,
}: Props) => {
  const { page, size, handlePageChange } = usePagination({
    defaultSize,
    sectionName: 'history',
  });

  const { open } = useMembershipInfoModal();
  const { data: myProfile } = useMyProfile();
  const { data: membershipFee } = useMembershipFee({
    hasPermission,
    page,
    size,
  });

  return (
    <Section>
      <Section.Header
        title={title ?? '신청 내역'}
        description="최근에 신청된 회비 신청 내역이에요"
      />
      <Section.Body>
        <Table head={TABLE_HEAD.SUPPORT_HISTORY}>
          {membershipFee.items.map((membership) => (
            <Table.Row
              key={membership.id}
              onClick={() =>
                open({
                  data: membership,
                  hasPermission: myProfile.roleLevel! >= ROLE_LEVEL.SUPER,
                })
              }
            >
              <Table.Cell>{membership.id}</Table.Cell>
              <Table.Cell>
                <MembershipStatusBadge status={membership.status} />
              </Table.Cell>
              <Table.Cell> {membership.category}</Table.Cell>
              <Table.Cell>
                {formatMemberName(membership.memberName, membership.memberId)}
              </Table.Cell>
              <Table.Cell>{formattedDate(membership.createdAt)}</Table.Cell>
            </Table.Row>
          ))}
        </Table>
        {withPagination && (
          <Pagination
            className="mt-4 justify-center"
            totalItems={membershipFee.totalItems}
            postLimit={size}
            onChange={handlePageChange}
            page={page}
          />
        )}
      </Section.Body>
    </Section>
  );
};

export default SupportHistorySection;
