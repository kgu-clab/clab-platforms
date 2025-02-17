import { Suspense } from 'react';
import { useParams } from 'react-router';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { LIBRARY_MESSAGE } from '@constants/message';
import { PATH, PATH_NAME } from '@constants/path';

import { DetailsSection } from './components/BookDetailSection';
import { LoanHistorySection } from './components/BookLoanHistorySection';

export default function LibraryDetailPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    throw new Error(LIBRARY_MESSAGE.NO_BOOK);
  }

  return (
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
      <Content>
        <Header title={[PATH_NAME.LIBRARY]} path={[PATH.LIBRARY]} />
        <Suspense>
          <DetailsSection paramsId={id} />
        </Suspense>

        <Suspense>
          <LoanHistorySection paramsId={id} />
        </Suspense>
      </Content>
    </QueryErrorBoundary>
  );
}
