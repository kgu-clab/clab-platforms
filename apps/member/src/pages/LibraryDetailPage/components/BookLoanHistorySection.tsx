import { Table } from '@clab-platforms/design-system';

import Section from '@components/common/Section/Section';
import BookLoanConditionStatusBadge from '@components/library/BookLoanConditionStatusBadge';

import { TABLE_HEAD } from '@constants/head';
import { useBookLoanRecordConditions } from '@hooks/queries';
import { useBookDetails } from '@pages/LibraryPage/hooks/useBookDetails';
import { formattedDate } from '@utils/date';
import { formatMemberName } from '@utils/string';

interface Props {
  paramsId: string;
}

export function LoanHistorySection({ paramsId }: Props) {
  const { data: bookDetails } = useBookDetails(+paramsId);
  const { data } = useBookLoanRecordConditions({ bookId: bookDetails.id });

  return (
    <Section>
      <Section.Header title="대여 내역" description="최근 대여 내역이에요" />
      <Section.Body>
        <Table head={TABLE_HEAD.BOOK_LOAN_RECORD}>
          {data.items.map(
            ({ borrowerName, borrowerId, dueDate, borrowedAt, returnedAt }) => (
              <Table.Row key={`book-loan-history-${borrowerId}-${borrowedAt}`}>
                <Table.Cell>
                  {formatMemberName(borrowerName, borrowerId)}
                </Table.Cell>
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
}
