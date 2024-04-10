import EmptyBox from '@components/common/EmptyBox/EmptyBox';
import PostCard from '@components/common/PostCard/PostCard';
import Section from '@components/common/Section/Section';
import { COMMUNITY_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import { useBoardsList } from '@hooks/queries';

const OrganizationNewsSection = () => {
  const { data } = useBoardsList({ category: 'organization' });

  return (
    <Section>
      <Section.Header title="최근 동아리 소식" />
      <Section.Body className="flex gap-2 overflow-scroll scrollbar-hide">
        {data.items.length === 0 ? (
          <EmptyBox>{COMMUNITY_MESSAGE.NO_ARTICLE}</EmptyBox>
        ) : (
          data.items.map((news) => (
            <PostCard
              key={news.id}
              to={PATH_FINDER.COMMUNITY_POST('organization', news.id)}
              {...news}
            />
          ))
        )}
      </Section.Body>
    </Section>
  );
};

export default OrganizationNewsSection;
