import { Suspense } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@clab-platforms/design-system';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { PATH } from '@constants/path';

import BookExplorerSection from './components/BookExplorerSection';
import NewBooksSection from './components/NewBooksSection';

export default function LibraryPage() {
  const navigate = useNavigate();

  return (
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
      <Content>
        <Header title="도서관">
          <Button size="sm" onClick={() => navigate(PATH.MEMBERSHIP_FEE)}>
            희망도서 신청하기
          </Button>
        </Header>

        <Suspense>
          <NewBooksSection />
        </Suspense>

        <Suspense>
          <BookExplorerSection />
        </Suspense>
      </Content>
    </QueryErrorBoundary>
  );
}
