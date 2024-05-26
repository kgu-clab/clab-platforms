import { Section } from '@components/common/Section';
import Skeleton from '@components/common/Skeleton/Skeleton';

const BoardSkeleton = () => {
  return (
    <Section>
      <Skeleton width="100" height="24" />
      <Section.Body className="space-y-2">
        <Skeleton height="20" repeat={6} />
      </Section.Body>
    </Section>
  );
};

export default BoardSkeleton;
