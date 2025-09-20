import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { PATH } from '@constants/path';
import SupportNav from '@pages/SupportPage/components/SupportNav';

import SupportForm from './components/SupportForm';
import SupportWriteIntroduceSection from './components/SupportWriteIntroduceSection';

export default function SupportWritePage() {
  return (
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
      <Content>
        <Header
          title={['문의', '문의하기']}
          path={[PATH.SUPPORT, PATH.SUPPORT_WRITE]}
        >
          <SupportNav />
        </Header>

        <Suspense>
          <SupportWriteIntroduceSection />
        </Suspense>

        <Suspense>
          <SupportForm />
        </Suspense>
      </Content>
    </QueryErrorBoundary>
  );
}
