import { Table } from '@clab/design-system';

import Section from '@components/common/Section/Section';

import { TABLE_HEAD } from '@constants/head';
import { useBookLoanRecordConditions } from '@hooks/queries';
import { formattedDate } from '@utils/date';

import BookLoanConditionStatusBadge from '../BookLoanConditionStatusBadge/BookLoanConditionStatusBadge';

interface BookLoanHistorySectionProps {
  id: number;
}

const BookLoanHistorySection = ({ id }: BookLoanHistorySectionProps) => {
  const { data } = useBookLoanRecordConditions({ bookId: id });

  return (
    <Section>
      <Section.Header title="대여 내역" description="최근 대여 내역이에요" />
      <Section.Body>
        <Table head={TABLE_HEAD.BOOK_LOAN_RECORD}>
          {data.items.map(
            ({ borrowerName, borrowerId, dueDate, borrowedAt, returnedAt }) => (
              <Table.Row key={`book-loan-history-${borrowerId}-${borrowedAt}`}>
                <Table.Cell>{`${borrowerName} (${borrowerId})`}</Table.Cell>
                <Table.Cell>{formattedDate(borrowedAt)}</Table.Cell>
                <Table.Cell>
                  {returnedAt
                    ? formattedDate(returnedAt)
                    : formattedDate(dueDate)}
                </Table.Cell>
                <Table.Cell>
                  <BookLoanConditionStatusBadge
                    borrowedAt={borrowedAt}
                    returnedAt={returnedAt}
                  />
                </Table.Cell>
              </Table.Row>
            ),
          )}
        </Table>
      </Section.Body>
    </Section>
  );
};

export default BookLoanHistorySection;
