import { Badge, Table } from '@clab/design-system';

import Section from '@components/common/Section/Section';

import { TABLE_HEAD } from '@constants/head';
import { useBookLoanRecordConditions } from '@hooks/queries';
import { formattedDate } from '@utils/date';

interface BookLoanHistorySectionProps {
  bookId: number;
}

const BookLoanHistorySection = ({ bookId }: BookLoanHistorySectionProps) => {
  const { data } = useBookLoanRecordConditions({ bookId });

  return (
    <Section>
      <Section.Header
        title="대여 내역"
        description="최근 대여 내역이에요"
      ></Section.Header>
      <Section.Body>
        <Table head={TABLE_HEAD.BOOK_LOAN_RECORD}>
          {data.items.map(({ borrowerId, borrowedAt, returnedAt }, index) => (
            <Table.Row key={index}>
              <Table.Cell>{borrowerId}</Table.Cell>
              <Table.Cell>{formattedDate(borrowedAt)}</Table.Cell>
              <Table.Cell>
                {returnedAt ? formattedDate(returnedAt) : '예정'}
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
