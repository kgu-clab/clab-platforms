import Section from '@components/common/Section/Section';
import { Link } from 'react-router-dom';
import { Button } from '@clab/design-system';
import Image from '@components/common/Image/Image';
import { BOOK_STATE } from '@constants/state';
import { BookItem } from '@type/book';

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
  const { borrowerId, category, title, author, publisher, imageUrl } = data;

  return (
    <Section>
      <div className="flex flex-col gap-2 px-2">
        <div className="my-4 gap-4 lg:grid lg:grid-cols-2">
          <div className="md:mb-4 lg:m-0 lg:max-w-3xl flex justify-center">
            <Image
              src={imageUrl}
              alt={title}
              width="w-[380px]"
              className="object-cover hover:shadow-xl shadow-md transition-shadow"
            />
          </div>
          <div className="flex flex-col gap-4 justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold pb-4">{title}</h1>
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
                <p className="text-xl font-bold pt-12 underline decoration-green-700">
                  이미 대여된 도서예요! 조금만 기다려주세요 ⏳
                </p>
              ) : (
                <Button className="w-full">대여하기</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BookDetailSection;
