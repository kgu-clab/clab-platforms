import Section from '@components/common/Section/Section';
import Image from '@components/common/Image/Image';
import { Button, DetailsList, Badge, Grid, Tabs } from '@clab/design-system';
import { BOOK_STATE } from '@constants/state';
import { useBookLoanBorrowMutation } from '@hooks/queries/useBookLoanBorrowMutation';
import { useMyProfile } from '@hooks/queries/useMyProfile';
import { useCallback } from 'react';
import { createImageUrl } from '@utils/api';
import { SELECT_DEFAULT_OPTION } from '@constants/select';
import kyoboIcon from '@assets/webp/kyobobook.webp';
import aladinIcon from '@assets/webp/aladin.webp';
import yes24Icon from '@assets/svg/yes24.svg';
import type { BookItem } from '@type/book';

interface BookDetailSectionProps {
  data: BookItem;
}

const tabsOptions = [
  {
    icon: <img src={kyoboIcon} alt="" className="size-6" />,
    value: '교보문고',
  },
  {
    icon: <img src={yes24Icon} alt="" className="size-6" />,
    value: '예스24',
  },
  {
    icon: <img src={aladinIcon} alt="" className="rounded-lg size-6" />,
    value: '알라딘',
  },
];

const BookDetailSection = ({ data }: BookDetailSectionProps) => {
  const { data: myInfo } = useMyProfile();
  const { bookBorrowMutate } = useBookLoanBorrowMutation();
  const { id, borrowerId, category, title, author, publisher, imageUrl } = data;

  const handleBorrowClick = useCallback(
    (bookId: number) => {
      bookBorrowMutate({
        memberId: myInfo.id,
        bookId: bookId,
        borrowerId: myInfo.id,
      });
    },
    [bookBorrowMutate, myInfo.id],
  );

  return (
    <Section>
      <Grid gap="lg" className="lg:grid-cols-2">
        <Image
          src={createImageUrl(imageUrl)}
          alt={title}
          className="object-cover shadow-lg"
        />
        <div className="flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold break-keep">{title}</h1>
            <DetailsList>
              <DetailsList.Item label="작가">{author}</DetailsList.Item>
              <DetailsList.Item label="출판사">{publisher}</DetailsList.Item>
              <DetailsList.Item label="분류">{category}</DetailsList.Item>
              <DetailsList.Item label="대여 상태">
                <Badge color={borrowerId ? 'red' : 'green'}>
                  {borrowerId ? BOOK_STATE.BORROWED : BOOK_STATE.AVAILABLE}
                </Badge>
              </DetailsList.Item>
            </DetailsList>
            <Tabs value={SELECT_DEFAULT_OPTION} options={tabsOptions} />
          </div>
          <Button
            className="w-full"
            disabled={!!borrowerId}
            onClick={() => handleBorrowClick(id)}
          >
            {borrowerId
              ? '이미 대여된 도서예요! 조금만 기다려주세요'
              : '대여하기'}
          </Button>
        </div>
      </Grid>
    </Section>
  );
};

export default BookDetailSection;
