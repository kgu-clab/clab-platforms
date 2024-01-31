import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import ApplyForm from '@components/group/ApplyForm/ApplyForm';

const GroupApplyPage = () => {
  return (
    <Content>
      <Header title={['활동', '활동신청']} />
      <ApplyForm />
    </Content>
  );
};
export default GroupApplyPage;
