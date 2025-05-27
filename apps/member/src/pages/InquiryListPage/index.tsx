import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import ErrorSection from '@components/common/ErrorSection/ErrorSection';
import Header from '@components/common/Header/Header';
import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { PATH } from '@constants/path';
import InquiryListSection from '@pages/InquiryListPage/components/InquiryListSection';
import InquiryNav from '@pages/InquiryPage/components/InquiryNav';

import InquiryMySection from './components/InquiryMySection';

export default function InquiryIndexPage() {
  return (
    <QueryErrorBoundary
      fallback={({ reset }) => <ErrorSection reset={reset} />}
    >
      <Content>
        <Header
          title={['문의', '전체 문의']}
          path={[PATH.INQUIRY, PATH.INQUIRY_LIST]}
        >
          <InquiryNav></InquiryNav>
        </Header>
        <Suspense>
          <InquiryMySection></InquiryMySection>
        </Suspense>
        <Suspense>
          <InquiryListSection showAll={true}></InquiryListSection>
        </Suspense>
      </Content>
    </QueryErrorBoundary>
  );
}
