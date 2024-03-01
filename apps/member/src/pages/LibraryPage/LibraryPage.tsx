import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { Button } from '@clab/design-system';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@constants/path';
import { useBooks } from '@hooks/queries/useBooks';
import Section from '@components/common/Section/Section';
import LibraryBookList from '@components/library/LibraryBookList/LibraryBookList';
import Pagination from '@components/common/Pagination/Pagination';
import { useState } from 'react';

const LibraryPage = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 0,
    size: 16,
  });
  const { page, size } = pagination;
  const { data: newBooks } = useBooks(0, 4);
  const { data } = useBooks(page, size);

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page: page - 1 });
  };

  return (
    <Content>
      <Header title="도서관">
        <Button size="sm" onClick={() => navigate(PATH.SUPPORT)}>
          희망도서 신청하기
        </Button>
      </Header>
      <Section>
        <Section.Header title="신규" />
        <Section.Body>
          <LibraryBookList data={newBooks.items} />
        </Section.Body>
      </Section>
      <Section>
        <Section.Header title="소장도서" />
        <Section.Body>
          <LibraryBookList data={data.items} />
          <div className="flex justify-center mt-4">
            <Pagination
              totalItems={data.totalItems}
              pageLimit={5}
              postLimit={size}
              setPage={handlePageChange}
              page={page}
            />
          </div>
        </Section.Body>
      </Section>
    </Content>
  );
};

export default LibraryPage;
