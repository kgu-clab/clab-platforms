import { useCallback } from 'react';
import ListButton from '@components/common/ListButton/ListButton';
import Section from '@components/common/Section/Section';
import { toYYMMDD } from '@utils/date';
import { CommentItem } from '@type/comment';
import { PATH_FINDER } from '@constants/path';
import useModal from '@hooks/common/useModal';
import { Badge } from '@clab/design-system';
import type { BookLoanRecordConditionType } from '@type/book';
import type { BoardItem } from '@type/board';
import type { NotificationItem } from '@type/notification';

interface MyHistorySectionProps {
  title: string;
  data: Array<
    NotificationItem | BoardItem | CommentItem | BookLoanRecordConditionType
  >;
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
          /**
           * 나의 댓글
           */
          if ('boardId' in item) {
            const { id, boardId, boardCategory, content, createdAt } = item;
            return (
              <ListButton
                key={id}
                to={PATH_FINDER.COMMUNITY_POST(boardCategory, boardId)}
              >
                <p className="pr-4 truncate grow">{content}</p>
                <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
              </ListButton>
            );
          }
          /**
           * 도서 대출 내역
           */
          if ('bookId' in item) {
            const { bookId, bookTitle, borrowedAt, returnedAt } =
              item as BookLoanRecordConditionType;
            return (
              <ListButton key={bookId} to={PATH_FINDER.BOOK_DETAIL(bookId)}>
                <p className="pr-4 space-x-2 truncate grow">
                  <Badge color={returnedAt ? 'green' : 'yellow'}>
                    {returnedAt ? '반납완료' : '대출중'}
                  </Badge>
                  <span>{bookTitle}</span>
                </p>
                <p className="text-clab-main-light">
                  {toYYMMDD(borrowedAt ?? '')}
                </p>
              </ListButton>
            );
          }
          /**
           * 지난 알림
           */
          if ('content' in item) {
            const { id, content, createdAt } = item as CommentItem;
            return (
              <ListButton key={id} onClick={() => handleAlarmClick(content)}>
                <p className="pr-4 truncate grow">{content}</p>
                <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
              </ListButton>
            );
          }
          /**
           * 나의 게시글
           */
          if ('title' in item) {
            const { id, category, title, createdAt } = item as BoardItem;
            return (
              <ListButton
                key={id}
                to={PATH_FINDER.COMMUNITY_POST(category, id)}
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
