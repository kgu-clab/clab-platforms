import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import {
  MembershipFeeHistorySection,
  MembershipFeeHistorySectionSkeleton,
} from '@components/membership/membershipFee/MembershipFeeHistorySection';

import { IntroduceSection } from './components/IntroduceSection';
import { RequestSection } from './components/RequestSection';

export default function MembershipFeePage() {
  return (
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
      <Content>
        <Header title="회비" />
        <IntroduceSection />
        <RequestSection />

        <Suspense fallback={<MembershipFeeHistorySectionSkeleton />}>
          <MembershipFeeHistorySection />
        </Suspense>
      </Content>
    </QueryErrorBoundary>
  );
}
