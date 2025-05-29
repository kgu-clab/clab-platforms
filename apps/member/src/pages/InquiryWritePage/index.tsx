import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { PATH } from '@constants/path';

import InquiryForm from './components/InquiryForm';
import InquiryWriteIntroduceSection from './components/InquiryWriteIntroduceSection';

export default function InquiryWritePage() {
  return (
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
      <Content>
        <Header
          title={['문의', '문의하기']}
          path={[PATH.INQUIRY, PATH.INQUIRY_WRITE]}
        />

        <Suspense>
          <InquiryWriteIntroduceSection />
        </Suspense>

        <Suspense>
          <InquiryForm />
        </Suspense>
      </Content>
    </QueryErrorBoundary>
  );
}
