import Section from '@components/common/Section/Section';
import ListButton from '@components/common/ListButton/ListButton';
import MoreButton from '@components/common/MoreButton/MoreButton';
import { toYYMMDD } from '@utils/date';
import { CommunityPostItem } from '@type/community';
import { HireItem } from '@type/hire';
import { NewsItem } from '@type/news';

interface CommunitySectionProps {
  children: React.ReactNode;
}

interface CommunitySectionListProps {
  title: string;
  to: string;
  number?: number;
  data: Array<CommunityPostItem | HireItem | NewsItem>;
}

const CommunitySection = ({ children }: CommunitySectionProps) => {
  return (
    <div className="flex flex-col gap-4 text-sm xl:grid xl:grid-cols-2">
      {children}
    </div>
  );
};

CommunitySection.List = ({ title, to, data }: CommunitySectionListProps) => {
  return (
    <Section>
      <Section.Header title={title}>
        <MoreButton to={to} />
      </Section.Header>
      <Section.Body>
        {data.map((data, index) => (
          <ListButton key={index} to="">
            <p className="w-full truncate pr-4">{data.title}</p>
            <p className="text-clab-main-light">
              {data.createdAt ? toYYMMDD(data.createdAt) : ''}
            </p>
          </ListButton>
        ))}
      </Section.Body>
    </Section>
  );
};

export default CommunitySection;
