import { useParams } from 'react-router-dom';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import ActivityNoticeEditor from '@components/group/ActivityNoticeEditor/ActivityNoticeEditor';
import ActivityParticipantEditor from '@components/group/ActivityParticipantEditor/ActivityParticipantEditor';
import ActivityPostEditor from '@components/group/ActivityPostEditor/ActivityPostEditor';
import ActivityProfileEditor from '@components/group/ActivityProfileEditor/ActivityProfileEditor';

import { GROUP_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import { useActivityGroup } from '@hooks/queries/activity/useActivityGroup';

const GroupConfigPage = () => {
  const { id } = useParams();

  if (!id) throw new Error(GROUP_MESSAGE.NO_ACTIVITY);

  const { data } = useActivityGroup(+id);

  if (!data.isOwner) throw new Error(GROUP_MESSAGE.NO_PERMISSION);

  return (
    <Content>
      <Header
        title={[data.name, '관리']}
        path={[PATH_FINDER.ACTIVITY_DETAIL(id)]}
      />
      <ActivityProfileEditor data={data} />
      <ActivityParticipantEditor groupId={+id} />
      <ActivityNoticeEditor groupId={+id} data={data.notices} />
      <ActivityPostEditor
        groupId={+id}
        activities={data.activities}
        assignments={data.assignments}
      />
    </Content>
  );
};

export default GroupConfigPage;
