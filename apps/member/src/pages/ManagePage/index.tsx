import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import { MembershipFeeHistorySection } from '@components/membership/membershipFee/MembershipFeeHistorySection';

import { ROLE_LEVEL } from '@constants/state';
import { useMyProfile } from '@hooks/queries';

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
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
      <Content>
        <Header title="관리" />
        <Suspense>
          <MembershipFeeHistorySection
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
    </QueryErrorBoundary>
  );
}
