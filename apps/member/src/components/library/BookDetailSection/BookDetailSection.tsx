import Section from '@components/common/Section/Section';
import { Link } from 'react-router-dom';
import { Button } from '@clab/design-system';
import Image from '@components/common/Image/Image';
import { BOOK_STATE } from '@constants/state';

interface BookDetailSectionProps {
  data: {
    title: string;
    image: string;
    author: string;
    publisher: string;
    category: string;
    date: string;
    detail: string;
    state: string;
  };
}

interface BookInfoProps {
  to?: string;
  label: string;
  content: string;
}

const BookInfoRow = ({ to, label, content }: BookInfoProps) => {
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
  const { image, title, author, publisher, date, category, state, detail } =
    data;

  return (
    <Section>
      <div className="flex flex-col gap-2 px-2">
        <div className="my-4 gap-4 lg:grid lg:grid-cols-2">
          <div className="md:mb-4 lg:m-0 lg:max-w-3xl">
            <Image
              src={image}
              alt={title}
              width="w-[380px]"
              className="object-cover shadow-xl"
            />
          </div>
          <div className="flex flex-col gap-4 justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold pb-4">{title}</h1>
              <BookInfoRow label="작가" content={author} />
              <BookInfoRow label="출판사" content={publisher} />
              <BookInfoRow label="출간일" content={date} />
              <BookInfoRow label="분류" content={category} />
              <BookInfoRow label="대여 상태" content={state} />
              <BookInfoRow label="상세 정보" to={detail} content="교보문고" />
            </div>
            <div className="w-full">
              {state === BOOK_STATE.OK ? (
                <Button className="w-full mt-4 bg-clab-main text-white hover:bg-clab-main-dark">
                  대여하기
                </Button>
              ) : (
                <p className="text-xl font-bold pt-12 underline decoration-green-700">
                  이미 대여된 도서예요! 조금만 기다려주세요 ⏳
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BookDetailSection;
