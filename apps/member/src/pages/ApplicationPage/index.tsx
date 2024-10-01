import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { ROLE_LEVEL } from '@constants/state';
import { useMyProfile } from '@hooks/queries';

import { ApplicationListSection } from './components/ApplicationListSection';

export default function ApplicationPage() {
  const { data } = useMyProfile();

  if (data.roleLevel < ROLE_LEVEL.ADMIN) {
    throw new Error('접근 권한이 없습니다.');
  }

  return (
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
      <Content>
        <Header title="지원" />

        <Suspense>
          <ApplicationListSection />
        </Suspense>
      </Content>
    </QueryErrorBoundary>
  );
}
