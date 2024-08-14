import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@clab-platforms/design-system';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import LibraryBooksSection from '@components/library/LibraryBooksSection/LibraryBooksSection';
import LibraryNewBooksSection from '@components/library/LibraryNewBooksSection/LibraryNewBooksSection';

import { PATH } from '@constants/path';

const LibraryPage = () => {
  const navigate = useNavigate();

  return (
    <Content>
      <Header title="도서관">
        <Button size="sm" onClick={() => navigate(PATH.SUPPORT)}>
          희망도서 신청하기
        </Button>
      </Header>
      <Suspense>
        <LibraryNewBooksSection />
      </Suspense>
      <Suspense>
        <LibraryBooksSection />
      </Suspense>
    </Content>
  );
};

export default LibraryPage;
