import { Table } from '@clab-platforms/design-system';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Pagination from '@components/common/Pagination/Pagination';
import Section from '@components/common/Section/Section';
import MembershipStatusBadge from '@components/membership/MembershipStatusBadge/MembershipStatusBadge';

import { ROLE_LEVEL } from '@constants/state';
import { usePagination } from '@hooks/common/usePagination';
import { useMembershipInfoModal } from '@hooks/modal/useMembershipInfoModal';
import { useMembershipFee, useMyProfile } from '@hooks/queries';
import { formattedDate } from '@utils/date';
import { formatMemberName } from '@utils/string';

import { type MembershipFeeType } from '@type/membershipFee';

const TITLE = '신쳥 내역';

interface Props {
  title?: string;
  size?: number;
  withPagination?: boolean;
  hasPermission?: boolean;
}

export function SupportHistorySection({
  title,
  size: defaultSize,
  withPagination,
  hasPermission = false,
}: Props) {
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

  const handleInfoClick = (data: MembershipFeeType) => {
    open({
      data: data,
      hasPermission: myProfile.roleLevel >= ROLE_LEVEL.SUPER,
    });
  };

  return (
    <Section>
      <Section.Header
        title={title ?? TITLE}
        description="최근에 신청된 회비 신청 내역이에요"
      />
      <Section.Body>
        <Table head={['번호', '요청자', '구분', '상태', '신청일', '기능']}>
          {membershipFee.items.map((membership) => (
            <Table.Row
              key={membership.id}
              onClick={() => handleInfoClick(membership)}
            >
              <Table.Cell>{membership.id}</Table.Cell>
              <Table.Cell>
                {formatMemberName(membership.memberName, membership.memberId)}
              </Table.Cell>
              <Table.Cell> {membership.category}</Table.Cell>
              <Table.Cell>
                <MembershipStatusBadge status={membership.status} />
              </Table.Cell>
              <Table.Cell>{formattedDate(membership.createdAt)}</Table.Cell>
              <Table.Cell>
                <ActionButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInfoClick(membership);
                  }}
                >
                  정보
                </ActionButton>
              </Table.Cell>
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
}

export function SupportHistorySectionSkeleton() {
  return (
    <Section className="h-96 animate-pulse">
      <Section.Header title={TITLE} />
    </Section>
  );
}
