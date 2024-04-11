import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { Button } from '@clab/design-system';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@constants/path';
import { useBooks } from '@hooks/queries/useBooks';
import Section from '@components/common/Section/Section';
import LibraryBookList from '@components/library/LibraryBookList/LibraryBookList';
import Pagination from '@components/common/Pagination/Pagination';
import LibraryNewBooksSection from '@components/library/LibraryNewBooksSection/LibraryNewBooksSection';
import { usePagination } from '@hooks/common/usePagination';

const LibraryPage = () => {
  const navigate = useNavigate();
  const { page, size, handlePageChange } = usePagination();

  const { data: newBookData } = useBooks(0, 4);
  const { data: bookData } = useBooks(page, size);

  return (
    <Content>
      <Header title="도서관">
        <Button size="sm" onClick={() => navigate(PATH.SUPPORT)}>
          희망도서 신청하기
        </Button>
      </Header>
      <LibraryNewBooksSection data={newBookData.items} />
      <Section>
        <Section.Header title="소장 도서 둘러보기" />
        <Section.Body>
          <LibraryBookList data={bookData.items} />
          <Pagination
            className="justify-center mt-4"
            totalItems={bookData.totalItems}
            postLimit={size}
            onChange={handlePageChange}
            page={page}
          />
        </Section.Body>
      </Section>
    </Content>
  );
};

export default LibraryPage;
