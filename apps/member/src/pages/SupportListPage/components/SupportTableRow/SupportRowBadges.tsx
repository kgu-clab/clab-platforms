import { Badge } from '@clab-platforms/design-system';

import { SUPPORT_ANSWER_STATE } from '@constants/state';
import { toKoreaSupportCategory } from '@utils/string';

import type { SupportCategoryType, SupportStatusType } from '@type/support';

interface SupportRowBadgesProps {
  category: SupportCategoryType;
  status: SupportStatusType;
}

const SupportRowBadges = ({ category, status }: SupportRowBadgesProps) => {
  const isAnswered = status === SUPPORT_ANSWER_STATE.COMPLETED;

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
