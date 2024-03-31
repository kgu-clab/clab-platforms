import Card from '@components/common/Card/Card';
import Section from '@components/common/Section/Section';
import { COMMUNITY_MESSAGE } from '@constants/message';
import { PATH } from '@constants/path';
import type { BlogPostItem } from '@type/blog';
import type { CommunityPostItem } from '@type/community';

interface NewsCardSectionProps {
  to: string;
  title: string;
  data?: Array<BlogPostItem | CommunityPostItem>;
}

const NewsCardSection = ({ to, title, data = [] }: NewsCardSectionProps) => {
  const post_path = to === PATH.NEWS ? PATH.NEWS : PATH.BLOG;

  return (
    <Section>
      <Section.Header title={title}></Section.Header>
      <Section.Body className="flex gap-2 overflow-scroll scrollbar-hide">
        {data.length === 0 ? (
          <p className="w-full text-center text-gray-500">
            {COMMUNITY_MESSAGE.NO_ARTICLE}
          </p>
        ) : (
          data.map((news, index) => (
            <Card key={index} to={post_path} {...news} />
          ))
        )}
      </Section.Body>
    </Section>
  );
};

export default NewsCardSection;
