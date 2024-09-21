import { Suspense } from 'react';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';

import { ROLE_LEVEL } from '@constants/state';
import { useMyProfile } from '@hooks/queries';
import { ErrorBoundary } from '@suspensive/react';

import { ApplicationListSection } from './components/ApplicationListSection';

export default function ApplicationPage() {
  const { data } = useMyProfile();

  if (data.roleLevel < ROLE_LEVEL.ADMIN) {
    throw new Error('접근 권한이 없습니다.');
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallback={({ reset }) => <ErrorSection reset={reset} />}
        >
          <Content>
            <Header title="지원" />

            <Suspense>
              <ApplicationListSection />
            </Suspense>
          </Content>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
