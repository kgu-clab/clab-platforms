import { useMemo } from 'react';

import EmptyBox from '@components/common/EmptyBox/EmptyBox';
import ListButton from '@components/common/ListButton/ListButton';
import Section from '@components/common/Section/Section';
import BookLoanConditionStatusBadge from '@components/library/BookLoanConditionStatusBadge/BookLoanConditionStatusBadge';

import { MY_MESSAGE } from '@constants/message';
import { MODAL_TITLE } from '@constants/modal';
import { PATH_FINDER } from '@constants/path';
import useModal from '@hooks/common/useModal';
import {
  useBookLoanRecordConditions,
  useMyNotifications,
  useMyProfile,
} from '@hooks/queries';
import { toYYMMDD } from '@utils/date';

import { useMyBoards } from '../hooks/useMyBoards';
import { useMyComments } from '../hooks/useMyComments';

interface Props {
  category: '지난 알림' | '도서 대출 내역' | '나의 게시글' | '나의 댓글';
}

export function HistorySection({ category }: Props) {
  const { openModal } = useModal();

  const { data: myProfile } = useMyProfile();
  const { data: myNotifications } = useMyNotifications({});
  const { data: myBoardsData } = useMyBoards({});
  const { data: myCommentsData } = useMyComments({});
  const { data: myBookLoanRecord } = useBookLoanRecordConditions({
    borrowerId: myProfile.id,
    size: 10,
  });

  const contents = useMemo(() => {
    switch (category) {
      case '나의 댓글':
        return myCommentsData.items.map(
          ({ id, boardCategory, boardId, content, createdAt }) => (
            <ListButton
              key={`my-comment-${id}`}
              to={PATH_FINDER.COMMUNITY_POST(boardCategory, boardId)}
            >
              <p className="grow truncate pr-4">{content}</p>
              <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
            </ListButton>
          ),
        );
      case '도서 대출 내역':
        return myBookLoanRecord.items.map(
          ({ bookId, borrowedAt, returnedAt, bookTitle }, index) => (
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
                <p className="text-clab-main-light">{toYYMMDD(borrowedAt)}</p>
              )}
            </ListButton>
          ),
        );
      case '지난 알림':
        return myNotifications.items.map(({ id, content, createdAt }) => (
          <ListButton
            key={`my-alarm-${id}`}
            onClick={() =>
              openModal({
                title: MODAL_TITLE.ALARM,
                content: content,
              })
            }
          >
            <p className="grow truncate pr-4">{content}</p>
            <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
          </ListButton>
        ));
      case '나의 게시글':
        return myBoardsData.items.map(({ createdAt, category, id, title }) => (
          <ListButton
            key={createdAt}
            to={PATH_FINDER.COMMUNITY_POST(category, id)}
          >
            <p className="grow truncate pr-4">{title}</p>
            <p className="text-clab-main-light">{toYYMMDD(createdAt)}</p>
          </ListButton>
        ));
    }
  }, [
    category,
    myBoardsData.items,
    myBookLoanRecord.items,
    myCommentsData.items,
    myNotifications.items,
    openModal,
  ]);

  return (
    <Section>
      <Section.Header title={category} />
      <Section.Body className="text-sm">
        {contents.length === 0 ? (
          <EmptyBox className="grow">{MY_MESSAGE.NO_HISTORY}</EmptyBox>
        ) : (
          contents
        )}
      </Section.Body>
    </Section>
  );
}
