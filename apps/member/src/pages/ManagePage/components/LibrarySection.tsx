import { useState } from 'react';

import { Menubar, Table } from '@clab-platforms/design-system';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';
import BookLoanConditionStatusBadge from '@components/library/BookLoanConditionStatusBadge';

import { TABLE_HEAD } from '@constants/head';
import { usePagination } from '@hooks/common/usePagination';
import { useBookLoanRecordConditions } from '@hooks/queries';
import { calculateDDay, formattedDate } from '@utils/date';

import { useBookLoanRecordApproveMutation } from '../hooks/useBookLoanRecordApproveMutation';
import { useBookLoanRecordOverdue } from '../hooks/useBookLoanRecordOverdue';
import { useMemberInfoModal } from '../hooks/useMemberInfoModal';

type Mode = 'condition' | 'overdue';

export function LibrarySection() {
  const { open } = useMemberInfoModal();
  const { page, size, handlePageChange } = usePagination({
    sectionName: 'library',
  });

  const [mode, setMode] = useState<Mode>('condition');

  const { bookLoanRecordApproveMutate } = useBookLoanRecordApproveMutation();
  const { data: bookLoanRecordCondition } = useBookLoanRecordConditions({
    hasPermission: true,
    isReturned: false,
    page,
    size,
  });
  const { data: bookLoanRecordOverdue } = useBookLoanRecordOverdue({
    page,
    size,
  });

  const handleMenubarItemClick = (mode: Mode) => {
    setMode(mode);
  };

  const handleApproveButtonClick = (id: number) => {
    bookLoanRecordApproveMutate(id);
  };

  const handleMemberInfoClick = (memberId: string) => {
    open({ memberId: memberId });
  };

  const renderMode = {
    condition: (
      <Table head={['도서명', ...TABLE_HEAD.BOOK_LOAN_RECORD, '기능']}>
        {bookLoanRecordCondition.items.map(
          ({
            bookLoanRecordId,
            bookTitle,
            borrowerId,
            borrowerName,
            dueDate,
            borrowedAt,
            returnedAt,
          }) => (
            <Table.Row key={bookLoanRecordId}>
              <Table.Cell>{bookTitle}</Table.Cell>
              <Table.Cell>{`${borrowerName} (${borrowerId})`}</Table.Cell>
              <Table.Cell>{formattedDate(borrowedAt)}</Table.Cell>
              <Table.Cell>{formattedDate(dueDate)}</Table.Cell>
              <Table.Cell>
                <BookLoanConditionStatusBadge
                  borrowedAt={borrowedAt}
                  returnedAt={returnedAt}
                />
              </Table.Cell>
              <Table.Cell className="space-x-2">
                {dueDate === null && (
                  <ActionButton
                    onClick={() => handleApproveButtonClick(bookLoanRecordId)}
                  >
                    승인
                  </ActionButton>
                )}
                <ActionButton onClick={() => handleMemberInfoClick(borrowerId)}>
                  정보
                </ActionButton>
              </Table.Cell>
            </Table.Row>
          ),
        )}
      </Table>
    ),
    overdue: (
      <Table head={TABLE_HEAD.BOOK_LOAN_RECORDS_OVERDUE}>
        {bookLoanRecordOverdue.items.map(
          ({ bookTitle, borrowerId, borrowerName, dueDate, borrowedAt }) => (
            <Table.Row key={borrowerId + bookTitle + borrowedAt}>
              <Table.Cell>{bookTitle}</Table.Cell>
              <Table.Cell>{`${borrowerName} (${borrowerId})`}</Table.Cell>
              <Table.Cell>{formattedDate(borrowedAt)}</Table.Cell>
              <Table.Cell>{formattedDate(dueDate)}</Table.Cell>
              <Table.Cell>{calculateDDay(dueDate)}</Table.Cell>
              <Table.Cell>
                <ActionButton onClick={() => handleMemberInfoClick(borrowerId)}>
                  정보
                </ActionButton>
              </Table.Cell>
            </Table.Row>
          ),
        )}
      </Table>
    ),
  }[mode];

  return (
    <Section>
      <Section.Header
        title="도서관"
        description="대여자와 연체자를 확인할 수 있어요"
      >
        <Menubar>
          <Menubar.Item
            selected={mode === 'condition'}
            onClick={() => handleMenubarItemClick('condition')}
          >
            대여
          </Menubar.Item>
          <Menubar.Item
            selected={mode === 'overdue'}
            onClick={() => handleMenubarItemClick('overdue')}
          >
            연체
          </Menubar.Item>
        </Menubar>
      </Section.Header>
      <Section.Body>
        {renderMode}
        <Pagination
          className="mt-4 justify-center"
          page={page}
          postLimit={size}
          totalItems={
            mode === 'condition'
              ? bookLoanRecordCondition.totalItems
              : bookLoanRecordOverdue.totalItems
          }
          onChange={handlePageChange}
        />
      </Section.Body>
    </Section>
  );
}
