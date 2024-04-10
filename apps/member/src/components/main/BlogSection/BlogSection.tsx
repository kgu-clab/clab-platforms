import { useBlog } from '@hooks/queries';
import Section from '@components/common/Section/Section';
import { COMMUNITY_MESSAGE } from '@constants/message';
import PostCard from '@components/common/PostCard/PostCard';
import { PATH } from '@constants/path';
import EmptyBox from '@components/common/EmptyBox/EmptyBox';

const BlogSection = () => {
  const { data } = useBlog();

  return (
    <Section>
      <Section.Header title="기술 블로그" />
      <Section.Body className="flex gap-2 overflow-scroll scrollbar-hide">
        {data.items.length === 0 ? (
          <EmptyBox>{COMMUNITY_MESSAGE.NO_ARTICLE}</EmptyBox>
        ) : (
          data.items.map((news) => (
            <PostCard key={news.id} to={PATH.BLOG} {...news} />
          ))
        )}
      </Section.Body>
    </Section>
  );
};

export default BlogSection;
