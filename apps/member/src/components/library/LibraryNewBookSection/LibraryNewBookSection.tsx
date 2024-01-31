import Section from '@components/common/Section/Section';
import LibraryBookList from '../LibraryBookList/LibraryBookList';
import bookCollection from '@mocks/data/bookCollection.json';

const LibraryNewBookSection = () => {
  return (
    <Section>
      <Section.Header title="권장도서" />
      <Section.Body>
        <LibraryBookList
          data={bookCollection.slice(
            bookCollection.length - 4,
            bookCollection.length,
          )}
        />
      </Section.Body>
    </Section>
  );
};

export default LibraryNewBookSection;
