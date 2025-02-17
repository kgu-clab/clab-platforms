import { useNavigate, useParams } from 'react-router';

import { Button, Table } from '@clab-platforms/design-system';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import ActivityDetailSection from '@components/group/ActivityDetailSection/ActivityDetailSection';
import ActivityNoticeSection from '@components/group/ActivityNoticeSection/ActivityNoticeSection';
import WeeklyActivitySection from '@components/group/WeeklyActivitySection/WeeklyActivitySection';

import { TABLE_HEAD } from '@constants/head';
import { GROUP_MESSAGE } from '@constants/message';
import { PATH, PATH_FINDER } from '@constants/path';
import { ACTIVITY_MEMBER_STATE, ACTIVITY_STATE } from '@constants/state';
import { useModal } from '@hooks/common/useModal';
import { useMyProfile } from '@hooks/queries';
import { useActivityGroup } from '@hooks/queries/activity/useActivityGroup';

const GroupDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { open } = useModal();

  if (!id) throw new Error(GROUP_MESSAGE.NO_ACTIVITY);

  const { data: myProfile } = useMyProfile();
  const { data } = useActivityGroup(+id);

  if (data.status === ACTIVITY_STATE.END)
    throw new Error(GROUP_MESSAGE.END_ACTIVITY);

  const acceptedParticipant = data.groupMembers.filter(
    (member) => member.status === ACTIVITY_MEMBER_STATE.ACCEPTED,
  );
  const isParticipant = acceptedParticipant.some(
    (member) => member.memberId === myProfile.id,
  );

  const handleApplicationClick = () => {
    open({
      title: '참여자 목록',
      content: (
        <Table head={TABLE_HEAD.ACTIVITY_GROUP_PARTICIPANTS} className="w-full">
          {acceptedParticipant.map(({ memberId, memberName }, index) => (
            <Table.Row key={index}>
              <td>{index + 1}</td>
              <td>{memberId}</td>
              <td>{memberName}</td>
            </Table.Row>
          ))}
        </Table>
      ),
    });
  };

  return (
    <Content>
      <Header title={['활동', data.name]} path={PATH.ACTIVITY}>
        <Button size="sm" onClick={handleApplicationClick}>
          참여자 목록
        </Button>
        {data.isOwner && (
          <Button
            size="sm"
            color="red"
            onClick={() => navigate(PATH_FINDER.ACTIVITY_CONFIG(id))}
          >
            관리
          </Button>
        )}
      </Header>
      <ActivityDetailSection data={data} />
      <ActivityNoticeSection data={data.notices} />
      <WeeklyActivitySection
        data={data.activities}
        isParticipant={isParticipant}
      />
    </Content>
  );
};

export default GroupDetailPage;
