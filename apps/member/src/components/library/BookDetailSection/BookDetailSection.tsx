import Section from '@components/common/Section/Section';
import { Link } from 'react-router-dom';
import { Button } from '@clab/design-system';
import Image from '@components/common/Image/Image';
import { BOOK_STATE } from '@constants/state';
import { useBookLoanBorrowMutation } from '@hooks/queries/useBookLoanBorrowMutation';
import { useMyProfile } from '@hooks/queries/useMyProfile';
import type { BookItem } from '@type/book';

interface BookDetailSectionProps {
  data: BookItem;
}

interface BookInfoRowProps {
  to?: string;
  label: string;
  content: string;
}

const BookInfoRow = ({ to, label, content }: BookInfoRowProps) => {
  return (
    <div className="flex">
      <p className="w-20 font-semibold">{label}</p>
      {to ? (
        <Link to={to} className="content-link">
          {content}
        </Link>
      ) : (
        <p className="content-text">{content}</p>
      )}
    </div>
  );
};

const BookDetailSection = ({ data }: BookDetailSectionProps) => {
  const { data: myInfo } = useMyProfile();
  const { bookBorrowMutate } = useBookLoanBorrowMutation();
  const { id, borrowerId, category, title, author, publisher, imageUrl } = data;

  const onClickBorrow = (bookId: number) => {
    bookBorrowMutate({
      memberId: myInfo.id,
      bookId: bookId,
      borrowerId: myInfo.id,
    });
  };

  return (
    <Section>
      <div className="flex flex-col gap-2 px-2">
        <div className="gap-4 my-4 space-y-4 lg:grid lg:grid-cols-2">
          <div className="flex justify-center md:mb-4 lg:m-0 lg:max-w-3xl">
            <Image
              src={imageUrl}
              alt={title}
              width="w-[300px]"
              height="max-h-[384px]"
              className="object-cover shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <h1 className="pb-4 text-2xl font-bold break-keep">{title}</h1>
              <BookInfoRow label="작가" content={author} />
              <BookInfoRow label="출판사" content={publisher} />
              <BookInfoRow label="분류" content={category} />
              <BookInfoRow
                label="대여 상태"
                content={
                  borrowerId ? BOOK_STATE.BORROWED : BOOK_STATE.AVAILABLE
                }
              />
            </div>
            <div className="w-full">
              {borrowerId ? (
                <p className="pt-12 text-xl font-bold text-center underline decoration-green-700 lg:text-left">
                  이미 대여된 도서예요! 조금만 기다려주세요 ⏳
                </p>
              ) : (
                <Button className="w-full" onClick={() => onClickBorrow(id)}>
                  대여하기
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BookDetailSection;
