import EmptyBox from '@components/common/EmptyBox/EmptyBox';
import PostCard from '@components/common/PostCard/PostCard';
import Section from '@components/common/Section/Section';

import { COMMUNITY_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import { useBoardByCategory } from '@hooks/queries';

const OrganizationNewsSection = () => {
  const { data } = useBoardByCategory({ category: 'organization' });

  return (
    <Section>
      <Section.Header title="최근 동아리 소식" />
      <Section.Body className="grid">
        {data.items.length === 0 ? (
          <EmptyBox>{COMMUNITY_MESSAGE.NO_ARTICLE}</EmptyBox>
        ) : (
          <div className="flex items-center overflow-auto">
            {data.items.map((news) => (
              <PostCard
                key={news.id}
                to={PATH_FINDER.COMMUNITY_POST('organization', news.id)}
                {...news}
              />
            ))}
          </div>
        )}
      </Section.Body>
    </Section>
  );
};

export default OrganizationNewsSection;
