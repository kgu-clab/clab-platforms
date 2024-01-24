import Section from '@components/common/Section/Section';
import LibraryBookList from '../LibraryBookList/LibraryBookList';
import bookCollection from '@mocks/data/bookCollection.json';

const LibraryNewBookSection = () => {
  return (
    <Section>
      <Section.Header title="신작도서" />
      <Section.Body>
        <LibraryBookList
          data={bookCollection.slice(
            bookCollection.length - 3,
            bookCollection.length,
          )}
          category="신작도서"
        />
      </Section.Body>
    </Section>
  );
};

export default LibraryNewBookSection;
