import ListButton from '@components/common/ListButton/ListButton';
import Section from '@components/common/Section/Section';
import { toYYMMDD } from '@utils/date';

interface HistorySectionProps {
  title: string;
  data: {
    id: number;
    content: string;
    createdAt: string;
  }[];
}

const HistorySection = ({ title, data }: HistorySectionProps) => {
  return (
    <Section>
      <Section.Header title={title} />
      <Section.Body className="text-sm">
        {data.map(({ id, content, createdAt }) => (
          <ListButton key={id} to="">
            <p className="w-full truncate pr-4">{content}</p>
            <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
          </ListButton>
        ))}
      </Section.Body>
    </Section>
  );
};

export default HistorySection;
