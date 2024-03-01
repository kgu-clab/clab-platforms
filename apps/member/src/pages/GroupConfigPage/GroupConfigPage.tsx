import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import ActivityProfileEditor from '@components/group/ActivityProfileEditor/ActivityProfileEditor';
import ActivityParticipantEditor from '@components/group/ActivityParticipantEditor/ActivityParticipantEditor';
import { GROUP_MESSAGE } from '@constants/message';
import { useActivityGroup } from '@hooks/queries/useActivityGroup';
import { useParams } from 'react-router-dom';
import ActivityNoticeEditor from '@components/group/ActivityNoticeEditor/ActivityNoticeEditor';
import ActivityPostEditor from '@components/group/ActivityPostEditor/ActivityPostEditor';

const GroupConfigPage = () => {
  const { id } = useParams();

  if (!id) throw new Error(GROUP_MESSAGE.NO_ACTIVITY);

  const { data } = useActivityGroup(+id);

  if (!data.isOwner) throw new Error(GROUP_MESSAGE.NO_PERMISSION);

  return (
    <Content>
      <Header title={[data.name, '관리']} />
      <ActivityProfileEditor data={data} />
      <ActivityParticipantEditor groupId={+id} />
      <ActivityNoticeEditor data={data.notices} />
      <ActivityPostEditor groupId={+id} data={data.activities} />
    </Content>
  );
};

export default GroupConfigPage;
