import Section from '@components/common/Section/Section';
import ListButton from '@components/common/ListButton/ListButton';
import MoreButton from '@components/common/MoreButton/MoreButton';
import { toYYMMDD } from '@utils/date';

interface CommunitySectionProps {
  title: string;
  to?: string;
  number?: number;
  data: {
    id: number;
    type?: string;
    title: string;
    createAt: string;
  }[];
}

const CommunitySection = ({
  title,
  to = '',
  number = 6,
  data,
}: CommunitySectionProps) => {
  return (
    <Section>
      <Section.Header title={title}>
        <MoreButton to={to} />
      </Section.Header>
      <Section.Body>
        {data.slice(0, number).map(({ id, type, title, createAt }) => (
          <ListButton key={id} to="">
            {type && <p className="break-keep pr-4">{type}</p>}
            <p className="w-full truncate pr-4">{title}</p>
            <p className="text-clab-main-light">{toYYMMDD(createAt)}</p>
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
