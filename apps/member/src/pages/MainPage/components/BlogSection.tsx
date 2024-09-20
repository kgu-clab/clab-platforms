import EmptyBox from '@components/common/EmptyBox/EmptyBox';
import PostCard from '@components/common/PostCard/PostCard';
import Section from '@components/common/Section/Section';

import { COMMUNITY_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import { useBlog } from '@hooks/queries';

export function BlogSection() {
  const { data } = useBlog();

  return (
    <Section>
      <Section.Header title="기술 블로그" />
      <Section.Body className="grid">
        {data.items.length === 0 ? (
          <EmptyBox>{COMMUNITY_MESSAGE.NO_ARTICLE}</EmptyBox>
        ) : (
          <div className="flex items-center overflow-auto">
            {data.items.map((blog) => (
              <PostCard
                key={blog.id}
                to={PATH_FINDER.BLOG_POST(blog.id)}
                {...blog}
              />
            ))}
          </div>
        )}
      </Section.Body>
    </Section>
  );
}
