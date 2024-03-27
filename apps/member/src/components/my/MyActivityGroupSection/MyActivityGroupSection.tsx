import NewsCard from '@components/common/NewsCard/NewsCard';
import Section from '@components/common/Section/Section';
import { PATH_FINDER } from '@constants/path';
import type { ActivityGroupMemberMyType } from '@type/activity';

interface MyActivityGroupSectionProps {
  data: ActivityGroupMemberMyType[];
}

const MyActivityGroupSection = ({ data }: MyActivityGroupSectionProps) => {
  return (
    <Section>
      <Section.Header title="나의 활동" />
      <Section.Body className="flex gap-2 overflow-scroll scrollbar-hide">
        {data.map((activityGroup) => (
          <NewsCard
            key={activityGroup.id}
            to={PATH_FINDER.ACTIVITY_DETAIL(activityGroup.id)}
            imageUrl={activityGroup.imageUrl}
            title={activityGroup.name}
            description={activityGroup.subject}
          />
        ))}
      </Section.Body>
    </Section>
  );
};

export default MyActivityGroupSection;
