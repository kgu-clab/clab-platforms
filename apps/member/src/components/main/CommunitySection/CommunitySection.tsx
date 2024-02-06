import Section from '@components/common/Section/Section';
import ListButton from '@components/common/ListButton/ListButton';
import MoreButton from '@components/common/MoreButton/MoreButton';
import { toYYMMDD } from '@utils/date';
import { CommunityPostItem } from '@type/community';
import { HireItem } from '@type/hire';
import { NewsItem } from '@type/news';

interface CommunitySectionProps {
  title: string;
  to: string;
  number?: number;
  data: Array<CommunityPostItem | HireItem | NewsItem>;
}

const CommunitySection = ({ title, to, data }: CommunitySectionProps) => {
  return (
    <Section>
      <Section.Header title={title}>
        <MoreButton to={to} />
      </Section.Header>
      <Section.Body>
        {data.map((data, index) => (
          <ListButton key={index} to="">
            {data.category && (
              <p className="break-keep pr-4">{data.category}</p>
            )}
            <p className="w-full truncate pr-4">{data.title}</p>
            <p className="text-clab-main-light">
              {data.createAt ? toYYMMDD(data.createAt) : ''}
            </p>
          </ListButton>
        ))}
      </Section.Body>
    </Section>
  );
};

interface CommunityProps {
  children: React.ReactNode;
}

CommunitySection.Wrapper = ({ children }: CommunityProps) => {
  return (
    <div className="flex flex-col gap-4 text-sm xl:grid xl:grid-cols-2">
      {children}
    </div>
  );
};

export default CommunitySection;
