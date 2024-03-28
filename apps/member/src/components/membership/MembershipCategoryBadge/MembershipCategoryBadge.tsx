import { Badge } from '@clab/design-system';

interface MembershipCategoryBadgeProps {
  category: string;
}

const MembershipCategoryBadge = ({
  category,
}: MembershipCategoryBadgeProps) => {
  return <Badge>{category.toUpperCase()}</Badge>;
};

export default MembershipCategoryBadge;
