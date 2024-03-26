import ListButton from '@components/common/ListButton/ListButton';
import Section from '@components/common/Section/Section';
import { toYYMMDD } from '@utils/date';
import type { BoardItem } from '@type/board';
import type { NotificationItem } from '@type/notification';
import { CommentItem } from '@type/comment';
import { PATH_FINDER } from '@constants/path';
import { titleToCategory } from '@utils/community';
import useModal from '@hooks/common/useModal';
import { useCallback } from 'react';

interface MyHistorySectionProps {
  title: string;
  data: Array<NotificationItem | BoardItem | CommentItem>;
}

const MyHistorySection = ({ title, data }: MyHistorySectionProps) => {
  const { openModal } = useModal();

  const handleAlarmClick = useCallback(
    (content: string) => {
      openModal({
        title: '알림',
        content: content,
      });
    },
    [openModal],
  );

  return (
    <Section>
      <Section.Header title={title} />
      <Section.Body className="text-sm">
        {data.map((item) => {
          if ('boardId' in item) {
            //  CommentItem
            const { id, boardId, boardCategory, content, createdAt } =
              item as CommentItem;
            return (
              <ListButton
                key={id}
                to={PATH_FINDER.COMMUNITY_POST(
                  titleToCategory(boardCategory),
                  boardId,
                )}
              >
                <p className="pr-4 truncate grow">{content}</p>
                <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
              </ListButton>
            );
          } else if ('content' in item) {
            // NotificationItem
            const { id, content, createdAt } = item as CommentItem;
            return (
              <ListButton key={id} onClick={() => handleAlarmClick(content)}>
                <p className="pr-4 truncate grow">{content}</p>
                <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
              </ListButton>
            );
          } else if ('title' in item) {
            // BoardItem
            const { id, category, title, createdAt } = item as BoardItem;
            return (
              <ListButton
                key={id}
                to={PATH_FINDER.COMMUNITY_POST(titleToCategory(category), id)}
              >
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

export default MyHistorySection;
