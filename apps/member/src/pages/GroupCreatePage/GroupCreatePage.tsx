import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import GroupCreateSection from '@components/group/GroupCreateSection/GroupCreateSection';

const GroupCreatePage = () => {
  return (
    <Content>
      <Header title={['활동', '새로운 그룹 만들기']} />
      <GroupCreateSection />
    </Content>
  );
};

export default GroupCreatePage;
