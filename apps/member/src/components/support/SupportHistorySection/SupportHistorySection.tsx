import { useCallback } from 'react';

import { Table } from '@clab/design-system';

import Pagination from '@components/common/Pagination/Pagination';
import Section from '@components/common/Section/Section';
import MembershipInfoModal from '@components/membership/MembershipInfoModal/MembershipInfoModal';
import MembershipStatusBadge from '@components/membership/MembershipStatusBadge/MembershipStatusBadge';

import { TABLE_HEAD } from '@constants/head';
import useModal from '@hooks/common/useModal';
import { usePagination } from '@hooks/common/usePagination';
import { useMembershipFee, useMyProfile } from '@hooks/queries';
import { useMembershipFeeModifyMutation } from '@hooks/queries/useMembershipFeeModifyMutation';
import { formattedDate } from '@utils/date';
import { formatMemberName } from '@utils/string';

import type {
  MembershipFeeType,
  MembershipStatusType,
} from '@type/membershipFee';

interface SupportHistorySectionProps {
  title?: string;
  size?: number;
  withPagination?: boolean;
}

const SupportHistorySection = ({
  title,
  size: defaultSize,
  withPagination,
}: SupportHistorySectionProps) => {
  const { openModal } = useModal();
  const { page, size, handlePageChange } = usePagination(defaultSize);

  const { data: myProfile } = useMyProfile();
  const { membershipFeeModifyMutate } = useMembershipFeeModifyMutation();
  const { data } = useMembershipFee({
    page,
    size,
  });
  /**
   * 회비 상세 내역을 모달을 통해서 보여줍니다.
   * 관리자 권한을 경우 승인 및 반려 처리가 가능합니다.
   */
  const handleButtonClick = useCallback(
    (membership: MembershipFeeType) => {
      const status: MembershipStatusType[] = ['PENDING', 'REJECTED']; // 해당 상태일 경우 승인 처리가 가능합니다.
      const isCantApproveStatus = status.includes(membership.status);
      const accept =
        myProfile.roleLevel! >= 3
          ? {
              text: isCantApproveStatus ? '승인' : '반려',
              onClick: () => {
                membershipFeeModifyMutate({
                  id: membership.id,
                  body: {
                    status: isCantApproveStatus ? 'APPROVED' : 'REJECTED',
                  },
                });
              },
            }
          : undefined;
      openModal({
        title: '회비 상세 내역',
        content: <MembershipInfoModal data={membership} />,
        accept,
      });
    },
    [membershipFeeModifyMutate, myProfile.roleLevel, openModal],
  );

  return (
    <Section>
      <Section.Header
        title={title ?? '신청 내역'}
        description="최근에 신청된 회비 신청 내역이에요"
      />
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
                {formatMemberName(membership.memberName, membership.memberId)}
              </Table.Cell>
              <Table.Cell>{formattedDate(membership.createdAt)}</Table.Cell>
            </Table.Row>
          ))}
        </Table>
        {withPagination && (
          <Pagination
            className="mt-4 justify-center"
            totalItems={data.totalItems}
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
