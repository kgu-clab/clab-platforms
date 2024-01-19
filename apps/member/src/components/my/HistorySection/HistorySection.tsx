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
      <Section.Body>
        {data.map(({ id, content, createdAt }) => (
          <ListButton key={id} to="" className="justify-between">
            <p className="truncate">{content}</p>
            <p>{toYYMMDD(createdAt)}</p>
          </ListButton>
        ))}
      </Section.Body>
    </Section>
  );
};

export default HistorySection;
