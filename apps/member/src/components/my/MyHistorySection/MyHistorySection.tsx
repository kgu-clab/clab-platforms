import EmptyBox from '@components/common/EmptyBox/EmptyBox';
import ListButton from '@components/common/ListButton/ListButton';
import Section from '@components/common/Section/Section';
import BookLoanConditionStatusBadge from '@components/library/BookLoanConditionStatusBadge/BookLoanConditionStatusBadge';

import { MY_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import useModal from '@hooks/common/useModal';
import { toYYMMDD } from '@utils/date';

import type { BookLoanRecordConditionType } from '@type/book';
import { CommentItem } from '@type/comment';
import type { IBoard } from '@type/community';
import type { NotificationItem } from '@type/notification';

interface MyHistorySectionProps {
  title: string;
  data: Array<
    NotificationItem | IBoard | CommentItem | BookLoanRecordConditionType
  >;
}

const MyHistorySection = ({ title, data }: MyHistorySectionProps) => {
  const { openModal } = useModal();

  const handleAlarmClick = (content: string) => {
    openModal({
      title: '알림',
      content: content,
    });
  };

  return (
    <Section>
      <Section.Header title={title} />
      <Section.Body className="text-sm">
        {data.length === 0 ? (
          <EmptyBox className="grow">{MY_MESSAGE.NO_HISTORY}</EmptyBox>
        ) : (
          data.map((item, index) => {
            /**
             * 나의 댓글
             */
            if ('boardId' in item) {
              const { id, boardId, boardCategory, content, createdAt } = item;
              return (
                <ListButton
                  key={`my-comment-${id}`}
                  to={PATH_FINDER.COMMUNITY_POST(boardCategory, boardId)}
                >
                  <p className="grow truncate pr-4">{content}</p>
                  <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
                </ListButton>
              );
            }
            /**
             * 도서 대출 내역
             */
            if ('bookId' in item) {
              const { bookId, bookTitle, borrowedAt, returnedAt } = item;
              return (
                <ListButton
                  key={`my-book-${bookId}-${index}`}
                  to={PATH_FINDER.BOOK_DETAIL(bookId)}
                >
                  <p className="grow space-x-2 truncate pr-4">
                    <BookLoanConditionStatusBadge
                      borrowedAt={borrowedAt}
                      returnedAt={returnedAt}
                    />
                    <span>{bookTitle}</span>
                  </p>
                  {borrowedAt && (
                    <p className="text-clab-main-light">
                      {toYYMMDD(borrowedAt)}
                    </p>
                  )}
                </ListButton>
              );
            }
            /**
             * 지난 알림
             */
            if ('content' in item) {
              const { id, content, createdAt } = item as CommentItem;
              return (
                <ListButton
                  key={`my-alarm-${id}`}
                  onClick={() => handleAlarmClick(content)}
                >
                  <p className="grow truncate pr-4">{content}</p>
                  <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
                </ListButton>
              );
            }
            /**
             * 나의 게시글
             */
            if ('title' in item) {
              const { id, category, title, createdAt } = item as IBoard;
              return (
                <ListButton
                  key={createdAt}
                  to={PATH_FINDER.COMMUNITY_POST(category, id)}
                >
                  <p className="grow truncate pr-4">{title}</p>
                  <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
                </ListButton>
              );
            }
          })
        )}
      </Section.Body>
    </Section>
  );
};

export default MyHistorySection;
