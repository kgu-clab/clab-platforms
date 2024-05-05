import { Suspense } from 'react';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import ManagerAlertSection from '@components/manage/ManageAlertSection/ManagerAlertSection';
import ManageBannerSection from '@components/manage/ManageBannerSection/ManageBannerSection';
import ManageCalendarSection from '@components/manage/ManageCalendarSection/ManageCalendarSection';
import ManageLibrarySection from '@components/manage/ManageLibrarySection/ManageLibrarySection';
import SupportHistorySection from '@components/support/SupportHistorySection/SupportHistorySection';

import { useMyProfile } from '@hooks/queries';

const ManagePage = () => {
  const { data } = useMyProfile();

  if (data.roleLevel! < 2) {
    throw new Error('접근 권한이 없습니다.');
  }

  return (
    <Content>
      <Header title="관리" />
      <Suspense>
        <SupportHistorySection title="회비" withPagination hasPermission />
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
      <Suspense>
        <ManageCalendarSection />
      </Suspense>
      <Suspense>
        <ManageBannerSection />
      </Suspense>
    </Content>
  );
};

export default ManagePage;
