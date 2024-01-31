import Button from '@components/common/Button/Button';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import GroupMain from '@components/group/GroupMain/GroupMain';
import { PATH } from '@constants/path';
import { useNavigate } from 'react-router-dom';

const GroupPage = () => {
  const navigate = useNavigate();

  return (
    <Content>
      <Header title="활동">
        <Button onClick={() => navigate(PATH.CREATE_GROUP)}>활동신청</Button>
        <Button color="blue">새 그룹 만들기</Button>
      </Header>
      <GroupMain />
    </Content>
  );
};

export default GroupPage;
