import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import CreateForm from '@components/group/CreateForm/CreateForm';

const GroupCreatePage = () => {
  return (
    <Content>
      <Header title={['활동', '활동신청']} />
      <CreateForm />
    </Content>
  );
};
export default GroupCreatePage;
