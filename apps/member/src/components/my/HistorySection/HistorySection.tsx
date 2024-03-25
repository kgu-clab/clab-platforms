import ListButton from '@components/common/ListButton/ListButton';
import Section from '@components/common/Section/Section';
import { toYYMMDD } from '@utils/date';
import type { BoardItem } from '@type/board';
import type { NotificationItem } from '@type/notification';
import { CommentItem } from '@type/comment';

interface HistorySectionProps {
  title: string;
  data: Array<NotificationItem | BoardItem | CommentItem>;
}

const HistorySection = ({ title, data }: HistorySectionProps) => {
  return (
    <Section>
      <Section.Header title={title} />
      <Section.Body className="text-sm">
        {data.map((item) => {
          if ('content' in item) {
            // NotificationItem or CommentItem
            const { id, content, createdAt } = item as NotificationItem;
            return (
              <ListButton key={id} to="">
                <p className="pr-4 truncate grow">{content}</p>
                <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
              </ListButton>
            );
          } else if ('title' in item) {
            // BoardItem
            const { id, title, createdAt } = item as BoardItem;
            return (
              <ListButton key={id} to="">
                <p className="pr-4 truncate grow">{title}</p>
                <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
              </ListButton>
            );
          }
        })}
      </Section.Body>
    </Section>
  );
};

export default HistorySection;
