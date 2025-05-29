import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import InquiryListSection from '../InquiryListPage/components/InquiryListSection';
import InquiryFaqSection from './components/InquiryFaqSection';
import InquiryIntroduceSection from './components/InquiryIntroduceSection';
import InquiryNav from './components/InquiryNav';

export default function InquiryPage() {
  return (
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
      <Content>
        <Header title="문의">
          <InquiryNav />
        </Header>

        <Suspense>
          <InquiryIntroduceSection />
        </Suspense>

        <Suspense>
          <InquiryFaqSection />
        </Suspense>

        <Suspense>
          <InquiryListSection />
        </Suspense>
      </Content>
    </QueryErrorBoundary>
  );
}
