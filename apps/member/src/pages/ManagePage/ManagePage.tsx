import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import ManagerAlertSection from '@components/manage/ManageAlertSection/ManagerAlertSection';
import ManageLibrarySection from '@components/manage/ManageLibrarySection/ManageLibrarySection';
import SupportHistorySection from '@components/support/SupportHistorySection/SupportHistorySection';

const ManagePage = () => {
  return (
    <Content>
      <Header title="관리" />
      <Suspense>
        <SupportHistorySection title="회비" withPagination />
      </Suspense>
      <Suspense>
        <ManageLibrarySection />
      </Suspense>
      <Suspense>
        <ManagerAlertSection category="notice" />
      </Suspense>
      <Suspense>
        <ManagerAlertSection category="organization" />
      </Suspense>
    </Content>
  );
};

export default ManagePage;
