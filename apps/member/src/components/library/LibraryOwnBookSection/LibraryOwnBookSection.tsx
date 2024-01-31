import Section from '@components/common/Section/Section';
import LibraryBookList from '../LibraryBookList/LibraryBookList';
import bookCollection from '@mocks/data/bookCollection.json';
import { useState } from 'react';
import Pagination from '@components/common/Pagination/Pagination';

const LibraryNewBookSection = () => {
  const [page, setPage] = useState(1);

  const limit = 12;
  const offset = (page - 1) * limit;

  return (
    <Section>
      <Section.Header title="소장도서" />
      <Section.Body>
        <LibraryBookList data={bookCollection.slice(offset, offset + limit)} />
        <div className="flex justify-center mt-4">
          <Pagination
            totalItems={bookCollection.length}
            pageLimit={5}
            postLimit={limit}
            setPage={setPage}
            page={page}
          />
        </div>
      </Section.Body>
    </Section>
  );
};

export default LibraryNewBookSection;
