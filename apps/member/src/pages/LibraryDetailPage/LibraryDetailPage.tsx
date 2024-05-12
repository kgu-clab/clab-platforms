import { useParams } from 'react-router-dom';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import BookDetailSection from '@components/library/BookDetailSection/BookDetailSection';
import BookLoanHistorySection from '@components/library/BookLoanHistorySection/BookLoanHistorySection';

import { LIBRARY_MESSAGE } from '@constants/message';
import { PATH, PATH_NAME } from '@constants/path';
import { useBookDetails } from '@hooks/queries/book';

const LibraryDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) throw new Error(LIBRARY_MESSAGE.NO_BOOK);

  const { data } = useBookDetails(+id);

  if (!data?.id) throw new Error(LIBRARY_MESSAGE.NO_BOOK);

  return (
    <Content>
      <Header title={[PATH_NAME.LIBRARY]} path={[PATH.LIBRARY]} />
      <BookDetailSection data={data} />
      <BookLoanHistorySection id={data.id} />
    </Content>
  );
};

export default LibraryDetailPage;
