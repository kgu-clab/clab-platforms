import { Link } from 'react-router-dom';

import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';

import { PATH_FINDER } from '@constants/path';
import { useBooks } from '@hooks/queries/useBooks';

const LibraryNewBooksSection = () => {
  const { data } = useBooks(0, 4);

  return (
    <Section>
      <Section.Header
        title="신규 도서"
        description="최근에 들어온 도서들을 확인해보세요"
      />
      <Section.Body className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {data.items.map(({ id, imageUrl, title, author, publisher }) => (
          <Link
            key={id}
            to={PATH_FINDER.BOOK_DETAIL(id)}
            className="group relative flex flex-col gap-2 overflow-hidden rounded-lg border"
          >
            <Image
              src={imageUrl}
              alt={title}
              className="rounded-lg object-cover transition-transform group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 via-black/30 opacity-0 group-hover:opacity-100" />
            <div className="absolute bottom-0 px-2 text-white opacity-0 transition-transform group-hover:-translate-y-2.5 group-hover:opacity-100">
              <p className="line-clamp-2 break-keep font-semibold">{title}</p>
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
