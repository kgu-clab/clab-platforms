import Section from '@components/common/Section/Section';
import { BookItem } from '@type/book';
import Image from '@components/common/Image/Image';
import { Link } from 'react-router-dom';
import { PATH_FINDER } from '@constants/path';

interface LibraNewBooksSectionProps {
  data: BookItem[];
}

const LibraryNewBooksSection = ({ data }: LibraNewBooksSectionProps) => {
  return (
    <Section>
      <Section.Header title="신규 도서">
        최근에 들어온 도서들을 확인해보세요
      </Section.Header>
      <Section.Body className="flex gap-4">
        {data.map(({ id, imageUrl, title, author, publisher }) => (
          <Link
            key={id}
            to={PATH_FINDER.BOOK_DETAIL(id)}
            className="relative flex flex-col gap-2 transition-transform group hover:scale-110"
          >
            <div className="overflow-hidden rounded-lg">
              <Image src={imageUrl} alt={title} className="object-cover " />
            </div>

            <div className="absolute inset-0 transition-all rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 bg-gradient-to-t from-black/60 via-black/30" />
            <div className="absolute bottom-0 px-2 text-white transition-all opacity-0 group-hover:-translate-y-5 group-hover:opacity-100">
              <p className="font-semibold break-keep">{title}</p>
              <p className="text-sm">
                {author} | {publisher}
              </p>
            </div>
          </Link>
        ))}
      </Section.Body>
    </Section>
  );
};

export default LibraryNewBooksSection;
