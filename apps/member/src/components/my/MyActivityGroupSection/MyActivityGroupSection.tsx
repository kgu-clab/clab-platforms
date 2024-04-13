import EmptyBox from '@components/common/EmptyBox/EmptyBox';
import PostCard from '@components/common/PostCard/PostCard';
import Section from '@components/common/Section/Section';

import { MY_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';

import type { ActivityGroupMemberMyType } from '@type/activity';

interface MyActivityGroupSectionProps {
  data: ActivityGroupMemberMyType[];
}

const MyActivityGroupSection = ({ data }: MyActivityGroupSectionProps) => {
  return (
    <Section>
      <Section.Header title="나의 활동" />
      <Section.Body className="scrollbar-hide flex gap-2 overflow-scroll">
        {data.length === 0 ? (
          <EmptyBox className="grow">{MY_MESSAGE.NO_ACTIVITY}</EmptyBox>
        ) : (
          data.map((activityGroup) => (
            <PostCard
              key={activityGroup.id}
              to={PATH_FINDER.ACTIVITY_DETAIL(activityGroup.id)}
              imageUrl={activityGroup.imageUrl}
              title={activityGroup.name}
              subTitle={activityGroup.subject}
            />
          ))
        )}
      </Section.Body>
    </Section>
  );
};

export default MyActivityGroupSection;
