import Section from '@components/common/Section/Section';
import ListButton from '@components/common/ListButton/ListButton';
import MoreButton from '@components/common/MoreButton/MoreButton';
import { toYYMMDD } from '@utils/date';
import { CommunityPostItem } from '@type/community';
import { HireItem } from '@type/hire';
import { NewsItem } from '@type/news';
import { createPath } from '@utils/api';

interface CommunitySectionProps {
  children: React.ReactNode;
}

interface CommunitySectionListProps {
  title: string;
  to: string;
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
        {data.slice(0, 6).map(({ id, title, createdAt }) => (
          <ListButton key={id} to={createPath(to, id)}>
            <p className="w-full truncate pr-4">{title}</p>
            <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
          </ListButton>
        ))}
      </Section.Body>
    </Section>
  );
};

export default CommunitySection;
