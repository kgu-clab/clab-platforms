import { Link } from 'react-router-dom';

import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';

import { PATH_FINDER } from '@constants/path';

import { BookItem } from '@type/book';

interface LibraNewBooksSectionProps {
  data: BookItem[];
}

const LibraryNewBooksSection = ({ data }: LibraNewBooksSectionProps) => {
  return (
    <Section>
      <Section.Header
        title="신규 도서"
        description="최근에 들어온 도서들을 확인해보세요"
      />
      <Section.Body className="flex gap-4">
        {data.map(({ id, imageUrl, title, author, publisher }) => (
          <Link
            key={id}
            to={PATH_FINDER.BOOK_DETAIL(id)}
            className="group relative flex flex-col gap-2 transition-transform hover:scale-110"
          >
            <div className="overflow-hidden rounded-lg">
              <Image src={imageUrl} alt={title} className="object-cover" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 via-black/30 opacity-0 transition-all group-hover:opacity-100" />
            <div className="absolute bottom-0 px-2 text-white opacity-0 transition-all group-hover:-translate-y-5 group-hover:opacity-100">
              <p className="break-keep font-semibold">{title}</p>
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
