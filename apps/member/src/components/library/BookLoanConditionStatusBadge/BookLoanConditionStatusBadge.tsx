import { Badge, BadgeColorType } from '@clab/design-system';

import type { BookLoanRecordConditionType } from '@type/book';

interface BookLoanConditionStatusBadgeProps
  extends Pick<BookLoanRecordConditionType, 'borrowedAt' | 'returnedAt'> {}

const BookLoanConditionStatusBadge = ({
  borrowedAt,
  returnedAt,
}: BookLoanConditionStatusBadgeProps) => {
  const text = !borrowedAt ? '대기' : !returnedAt ? '대여중' : '반납완료';
  const color: BadgeColorType = !borrowedAt
    ? 'red'
    : !returnedAt
      ? 'yellow'
      : 'green';

  return <Badge color={color}>{text}</Badge>;
};

export default BookLoanConditionStatusBadge;
