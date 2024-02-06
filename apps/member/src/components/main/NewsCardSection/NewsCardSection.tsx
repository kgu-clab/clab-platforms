import MoreButton from '@components/common/MoreButton/MoreButton';
import NewsCard from '@components/common/NewsCard/NewsCard';
import Section from '@components/common/Section/Section';
import { PATH } from '@constants/path';
import { BlogPostItem } from '@type/blog';
import { CommunityPostItem } from '@type/community';

interface NewsCardSectionProps {
  to: string;
  title: string;
  data: Array<BlogPostItem | CommunityPostItem>;
}

const NewsCardSection = ({ to, title, data }: NewsCardSectionProps) => {
  const post_path = to === PATH.NEWS ? PATH.NEWS : PATH.BLOG;

  return (
    <Section>
      <Section.Header title={title}>
        <MoreButton to={to} />
      </Section.Header>
      <Section.Body className="flex gap-2 overflow-scroll scrollbar-hide">
        {data.map((news, index) => (
          <NewsCard key={index} to={post_path} {...news} />
        ))}
      </Section.Body>
    </Section>
  );
};

export default NewsCardSection;
