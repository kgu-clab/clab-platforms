import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { PATH } from '@constants/path';
import SupportNav from '@pages/SupportPage/components/SupportNav';

import SupportListSection from './components/SupportListSection';
import SupportMySection from './components/SupportMySection';

export default function SupportIndexPage() {
  return (
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
      <Content>
        <Header
          title={['문의', '전체 문의']}
          path={[PATH.SUPPORT, PATH.SUPPORT_LIST]}
        >
          <SupportNav />
        </Header>

        <Suspense>
          <SupportMySection />
        </Suspense>

        <Suspense>
          <SupportListSection showAll={true} />
        </Suspense>
      </Content>
    </QueryErrorBoundary>
  );
}
