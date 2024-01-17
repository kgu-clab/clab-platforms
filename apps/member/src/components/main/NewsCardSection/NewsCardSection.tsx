import MoreButton from '@components/common/MoreButton/MoreButton';
import NewsCard from '@components/common/NewsCard/NewsCard';
import Section from '@components/common/Section/Section';
import { PATH } from '@constants/path';

interface NewsCardSectionProps {
  to: string;
  title: string;
  data: {
    id: number;
    title: string;
    image: string;
    description?: string;
  }[];
}

const NewsCardSection = ({ to, title, data }: NewsCardSectionProps) => {
  const post_path = to === PATH.NEWS ? PATH.NEWS : PATH.BLOG;

  return (
    <Section>
      <Section.Header title={title}>
        <MoreButton to={to} />
      </Section.Header>
      <Section.Body className="flex gap-2 overflow-scroll scrollbar-hide">
        {data.slice(0, 4).map(({ id, ...props }) => (
          <NewsCard key={id} to={post_path} {...props} />
        ))}
      </Section.Body>
    </Section>
  );
};

export default NewsCardSection;
