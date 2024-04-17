import { useCallback, useState } from 'react';

import { Badge, Menubar, MenubarItem, Table } from '@clab/design-system';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';
import MemberInfoModal from '@components/modal/MemberInfoModal/MemberInfoModal';

import { TABLE_HEAD } from '@constants/head';
import useModal from '@hooks/common/useModal';
import { usePagination } from '@hooks/common/usePagination';
import { useBookLoanRecordConditions } from '@hooks/queries';
import { useBookLoanRecordOverdue } from '@hooks/queries/useBookLoanRecordOverdue';
import { calculateDDay, formattedDate } from '@utils/date';

type Mode = 'condition' | 'overdue';

const ManageLibrarySection = () => {
  const { page, size, handlePageChange } = usePagination();
  const { openModal } = useModal();

  const [mode, setMode] = useState<Mode>('condition');

  const { data: bookLoanRecordCondition } = useBookLoanRecordConditions({
    isReturned: false,
    page,
    size,
  });
  const { data: bookLoanRecordOverdue } = useBookLoanRecordOverdue({
    page,
    size,
  });

  const handleMenubarItemClick = useCallback((mode: Mode) => setMode(mode), []);

  const handleContactButtonClick = useCallback(
    (id: string) => {
      return openModal({
        title: '멤버 정보',
        content: <MemberInfoModal id={id} />,
      });
    },
    [openModal],
  );

  const renderMode = {
    condition: (
      <Table head={['도서명', ...TABLE_HEAD.BOOK_LOAN_RECORD]}>
        {bookLoanRecordCondition.items.map(
          ({
            bookTitle,
            borrowerId,
            borrowerName,
            dueDate,
            borrowedAt,
            returnedAt,
          }) => (
            <Table.Row key={borrowerId + bookTitle + borrowedAt}>
              <Table.Cell>{bookTitle}</Table.Cell>
              <Table.Cell>{`${borrowerName} (${borrowerId})`}</Table.Cell>
              <Table.Cell>{formattedDate(borrowedAt)}</Table.Cell>
              <Table.Cell>{formattedDate(dueDate)}</Table.Cell>
              <Table.Cell>
                <Badge color={returnedAt ? 'green' : 'red'}>
                  {returnedAt ? '반납완료' : '대여중'}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <ActionButton
                  onClick={() => handleContactButtonClick(borrowerId)}
                >
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
                <ActionButton
                  onClick={() => handleContactButtonClick(borrowerId)}
                >
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
          <MenubarItem
            selected={mode === 'condition'}
            onClick={() => handleMenubarItemClick('condition')}
          >
            대여
          </MenubarItem>
          <MenubarItem
            selected={mode === 'overdue'}
            onClick={() => handleMenubarItemClick('overdue')}
          >
            연체
          </MenubarItem>
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
};

export default ManageLibrarySection;
