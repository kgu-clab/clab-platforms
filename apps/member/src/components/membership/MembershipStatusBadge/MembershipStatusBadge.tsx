import { Badge } from '@clab/design-system';

import { toMembershipStatusText } from '@utils/string';

import type { MembershipStatusType } from '@type/membershipFee';

interface MembershipStatusBadgeProps {
  status: MembershipStatusType;
}

const MembershipStatusBadge = ({ status }: MembershipStatusBadgeProps) => {
  return (
    <Badge color={status !== 'APPROVED' ? 'red' : 'green'}>
      {toMembershipStatusText(status)}
    </Badge>
  );
};

export default MembershipStatusBadge;
