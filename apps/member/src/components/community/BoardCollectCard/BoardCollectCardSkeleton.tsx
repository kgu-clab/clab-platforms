import { Section } from '@components/common/Section';
import Skeleton from '@components/common/Skeleton/Skeleton';

const BoardCollectCardSkeleton = () => {
  return (
    <Section className="p-2">
      <div className="flex items-center gap-4">
        <Skeleton size="48" />
        <div className="flex grow justify-between gap-4">
          <Skeleton height="48" />
          <Skeleton width="100" height="48" />
        </div>
      </div>
      <Section.Body className="mt-2">
        <Skeleton height="200" />
      </Section.Body>
    </Section>
  );
};

export default BoardCollectCardSkeleton;
