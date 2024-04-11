import { Suspense } from 'react';
import Header from '@components/common/Header/Header';
import Content from '@components/common/Content/Content';
import SupportProcedureSection from '@components/support/SupportProcedureSection/SupportProcedureSection';
import SupportRequestSection from '@components/support/SupportRequestSection/SupportRequestSection';
import SupportHistorySection from '@components/support/SupportHistorySection/SupportHistorySection';
import SupportHistorySectionSkeleton from '@components/support/SupportHistorySection/SupportHistorySectionSkeleton';

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
