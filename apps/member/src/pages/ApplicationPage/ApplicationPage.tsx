import { Suspense } from 'react';

import ApplicationListSection from '@components/application/ApplicationListSection/ApplicationListSection';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';

import { ROLE_LEVEL } from '@constants/state';
import { useMyProfile } from '@hooks/queries';
import { useRecruitment } from '@hooks/queries/recruitment/useRecruitment';
import { formattedDate } from '@utils/date';

const ApplicationPage = () => {
  const { data } = useMyProfile();
  const { data: recruitmentList } = useRecruitment();

  const optionList = recruitmentList.map((item) => ({
    id: item.id,
    value: item.id,
    name: `${item.applicationType} - ${formattedDate(item.startDate)} ~ ${formattedDate(item.endDate)}`,
  }));

  if (data.roleLevel! < ROLE_LEVEL.ADMIN) {
    throw new Error('접근 권한이 없습니다.');
  }

  return (
    <Content>
      <Header title="지원" />
      <Suspense>
        <ApplicationListSection recruitmentList={optionList} />
      </Suspense>
    </Content>
  );
};

export default ApplicationPage;
