import { useCallback, useState } from 'react';

import { Badge, Menubar, MenubarItem, Table } from '@clab/design-system';

import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import { useBookLoanRecordConditions } from '@hooks/queries';
import { useBookLoanRecordOverdue } from '@hooks/queries/useBookLoanRecordOverdue';
import { calculateDDay, formattedDate } from '@utils/date';

type View = '대여' | '연체';

const ManageLibrarySection = () => {
  const [view, setView] = useState<View>('대여');

  const { data: bookLoanRecordOverdue } = useBookLoanRecordOverdue();
  const { data: bookLoanRecordCondition } = useBookLoanRecordConditions({
    isReturned: false,
  });

  const handleMenubarItemClick = useCallback((view: View) => setView(view), []);

  const renderView = {
    대여: (
      <Table head={TABLE_HEAD.BOOK_LOAN_RECORD}>
        {bookLoanRecordCondition.items.map(
          (
            { borrowerId, borrowerName, dueDate, borrowedAt, returnedAt },
            index,
          ) => (
            <Table.Row key={index}>
              <Table.Cell>{`${borrowerName} (${borrowerId})`}</Table.Cell>
              <Table.Cell>{formattedDate(borrowedAt)}</Table.Cell>
              <Table.Cell>{formattedDate(dueDate)}</Table.Cell>
              <Table.Cell>
                <Badge color={returnedAt ? 'green' : 'red'}>
                  {returnedAt ? '반납완료' : '대여중'}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ),
        )}
      </Table>
    ),
    연체: (
      <Table head={TABLE_HEAD.BOOK_LOAN_RECORDS_OVERDUE}>
        {bookLoanRecordOverdue.items.map(
          (
            { bookTitle, borrowerId, borrowerName, dueDate, borrowedAt },
            index,
          ) => (
            <Table.Row key={index}>
              <Table.Cell>{bookTitle}</Table.Cell>
              <Table.Cell>{`${borrowerName} (${borrowerId})`}</Table.Cell>
              <Table.Cell>{formattedDate(borrowedAt)}</Table.Cell>
              <Table.Cell>{formattedDate(dueDate)}</Table.Cell>
              <Table.Cell>{calculateDDay(dueDate)}</Table.Cell>
            </Table.Row>
          ),
        )}
      </Table>
    ),
  }[view];

  return (
    <Section>
      <Section.Header title="도서">
        <Menubar>
          <MenubarItem
            selected={view === '대여'}
            onClick={() => handleMenubarItemClick('대여')}
          >
            대여
          </MenubarItem>
          <MenubarItem
            selected={view === '연체'}
            onClick={() => handleMenubarItemClick('연체')}
          >
            연체
          </MenubarItem>
        </Menubar>
      </Section.Header>
      <Section.Body>{renderView}</Section.Body>
    </Section>
  );
};

export default ManageLibrarySection;
