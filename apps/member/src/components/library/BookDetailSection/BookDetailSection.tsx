import Button from '@components/common/Button/Button';
import Section from '@components/common/Section/Section';
import SkeletonImage from '@components/common/Skeleton/SkeletonImage';
import { Link } from 'react-router-dom';

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

const BookDetailSection = ({ data }: BookDetailSectionProps) => {
  return (
    <Section>
      <div className="flex flex-col gap-2 px-2">
        <div className="my-4 gap-4 lg:grid lg:grid-cols-2">
          {/*  책 표지 */}
          <div className="md:mb-4 lg:m-0 lg:max-w-3xl">
            <SkeletonImage
              src={data.image}
              className="h-auto w-[380px] object-cover shadow-xl border"
              alt="도서 이미지"
              w={380}
              h="auto"
            />
          </div>

          {/* 책 정보 */}
          <div className="flex flex-col gap-4 justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold pb-4">{data.title}</h1>
              <div className="flex">
                <p className="pr-2 font-bold">작가</p>
                <p>{data.author}</p>
              </div>
              <div className="flex">
                <p className="pr-2 font-bold">출판사</p>
                <p>{data.publisher}</p>
              </div>
              <div className="flex">
                <p className="pr-2 font-bold">출간일</p>
                <p>{data.date}</p>
              </div>
              <div className="flex">
                <p className="pr-2 font-bold">분류</p>
                <p>{data.category}</p>
              </div>
              <div className="flex">
                <p className="pr-2 font-bold">대여 상태</p>
                <p>{data.state}</p>
              </div>
              <div className="flex">
                <p className="pr-2 font-bold">상세 정보</p>
                <Link to={data.detail}>교보문구</Link>
              </div>
            </div>

            <div className="w-full">
              {data?.state === '대여 가능' ? (
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
