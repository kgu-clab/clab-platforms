import { Badge, Table } from '@clab/design-system';

import Section from '@components/common/Section/Section';

import { TABLE_HEAD } from '@constants/head';
import { useBookLoanRecordConditions } from '@hooks/queries';
import { formattedDate } from '@utils/date';

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
          {data.items.map(({ borrowerId, dueDate, borrowedAt, returnedAt }) => (
            <Table.Row key={`book-loan-history-${borrowerId}-${borrowedAt}`}>
              <Table.Cell>{borrowerId}</Table.Cell>
              <Table.Cell>{formattedDate(borrowedAt)}</Table.Cell>
              <Table.Cell>
                {returnedAt
                  ? formattedDate(returnedAt)
                  : `${formattedDate(dueDate)} (예정)`}
              </Table.Cell>
              <Table.Cell>
                <Badge color={returnedAt ? 'green' : 'red'}>
                  {returnedAt ? '반납완료' : '대여중'}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </Section.Body>
    </Section>
  );
};

export default BookLoanHistorySection;
