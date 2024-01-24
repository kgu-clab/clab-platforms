import { useParams } from 'react-router-dom';
import bookCollection from '@mocks/data/bookCollection.json';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import BookDetailSection from '@components/library/BookDetailSection/BookDetailSection';

interface BookData {
  id: number;
  title: string;
  image: string;
  author: string;
  publisher: string;
  category: string;
  date: string;
  detail: string;
  state: string;
}

const LibraryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const data: BookData | undefined = bookCollection.find(
    (book) => book.id === Number(id),
  );

  if (data === undefined) {
    return <ErrorPage />;
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
