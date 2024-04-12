import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import SupportHistorySection from '@components/support/SupportHistorySection/SupportHistorySection';
import SupportHistorySectionSkeleton from '@components/support/SupportHistorySection/SupportHistorySectionSkeleton';
import SupportProcedureSection from '@components/support/SupportProcedureSection/SupportProcedureSection';
import SupportRequestSection from '@components/support/SupportRequestSection/SupportRequestSection';

const SupportPage = () => {
  return (
    <Content>
      <Header title="회비" />
      <SupportProcedureSection />
      <SupportRequestSection />
      <Suspense fallback={<SupportHistorySectionSkeleton />}>
        <SupportHistorySection />
      </Suspense>
    </Content>
  );
};

export default SupportPage;
