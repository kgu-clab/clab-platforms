import { useParams } from 'react-router-dom';
import bookCollection from '@mocks/data/bookCollection.json';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import BookDetailSection from '@components/library/BookDetailSection/BookDetailSection';

const LibraryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const data = bookCollection.find((book) => book.id === Number(id));

  if (!data) {
    throw new Error('존재하지 않는 도서입니다.');
  }

  return (
    <Content>
      <Header title={['도서관', data.title]} />
      <BookDetailSection data={data} />
      <Header title="대출내역" />
    </Content>
  );
};

export default LibraryDetailPage;
