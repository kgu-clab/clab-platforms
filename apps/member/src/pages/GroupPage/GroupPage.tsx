import { Button } from '@clab/design-system';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { PATH } from '@constants/path';
import { useNavigate } from 'react-router-dom';
import Section from '@components/common/Section/Section';
import GroupCard from '@components/group/GroupCard/GroupCard';
import { useActivityGroupMemberByStatus } from '@hooks/queries/useActivityGroupMemberByStatus';

const GroupPage = () => {
  const navigate = useNavigate();
  const { data } = useActivityGroupMemberByStatus();

  return (
    <Content>
      <Header title="활동">
        <Button size="sm" onClick={() => navigate(PATH.ACTIVITY_APPLY)}>
          활동신청
        </Button>
        <Button size="sm" color="blue">
          새로운 그룹 만들기
        </Button>
      </Header>
      <Section>
        <Section.Header title={`현재 진행중인 그룹 ${data.items.length}`} />
        <Section.Body className="space-y-4">
          {data.items.map(({ id, ...rest }) => (
            <GroupCard key={id} id={id} {...rest} />
          ))}
        </Section.Body>
      </Section>
    </Content>
  );
};

export default GroupPage;
