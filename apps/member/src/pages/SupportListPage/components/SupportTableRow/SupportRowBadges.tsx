import { Badge } from '@clab-platforms/design-system';

import { toKoreaSupportCategory } from '@utils/string';

import { Support } from '@type/support';

interface SupportRowBadgesProps {
  category: Support['category'];
  status: Support['status'];
}

const SupportRowBadges = ({ category, status }: SupportRowBadgesProps) => {
  const isAnswered = status === 'COMPLETED';

  return (
    <>
      <Badge color="primary" className="mr-2">
        {toKoreaSupportCategory(category)}
      </Badge>
      <Badge color={isAnswered ? 'green' : 'red'}>
        {isAnswered ? '답변완료' : '답변예정'}
      </Badge>
    </>
  );
};

export default SupportRowBadges;
