import { Suspense } from 'react';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';
import { SupportHistorySection } from '@components/support/SupportHistorySection';

import { ROLE_LEVEL } from '@constants/state';
import { useMyProfile } from '@hooks/queries';
import { ErrorBoundary } from '@suspensive/react';

import { ActivitySection } from './components/ActivitySection';
import { AlertSection } from './components/AlertSection';
import { BannerSection } from './components/BannerSection';
import { CalendarSection } from './components/CalendarSection';
import { LibrarySection } from './components/LibrarySection';
import { MemberRoleSection } from './components/MemberRoleSection';

export default function ManagePage() {
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
            <Header title="관리" />
            <Suspense>
              <SupportHistorySection
                title="회비"
                withPagination
                hasPermission
              />
            </Suspense>

            <Suspense>
              <LibrarySection />
            </Suspense>

            <Suspense>
              <AlertSection category="notice" />
            </Suspense>

            <Suspense>
              <AlertSection category="organization" />
            </Suspense>

            <Suspense>
              <CalendarSection />
            </Suspense>

            <Suspense>
              <MemberRoleSection />
            </Suspense>

            <Suspense>
              <ActivitySection />
            </Suspense>

            <Suspense>
              <BannerSection />
            </Suspense>
          </Content>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
