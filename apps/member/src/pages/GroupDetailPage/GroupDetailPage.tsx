import { Button } from '@clab/design-system';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { useParams } from 'react-router-dom';
import WeeklyActivitySection from '@components/group/WeeklyActivitySection/WeeklyActivitySection';
import Image from '@components/common/Image/Image';
import { GROUP_MESSAGE } from '@constants/message';
import ActivityNoticeSection from '@components/group/ActivityNoticeSection/ActivityNoticeSection';
import { useActivityGroup } from '@hooks/queries/useActivityGroup';
import useModal from '@hooks/common/useModal';

import Table from '@components/common/Table/Table';
import { LiaCertificateSolid } from 'react-icons/lia';
import { getDateSemester } from '@utils/date';
import Section from '@components/common/Section/Section';
import { MdOutlineDateRange } from 'react-icons/md';
import { TABLE_HEAD } from '@constants/head';
import { useMyProfile } from '@hooks/queries';

const GroupDetailPage = () => {
  const { id } = useParams();
  const { openModal } = useModal();

  if (!id) throw new Error(GROUP_MESSAGE.NO_ACTIVITY);

  const { data: myProfile } = useMyProfile();
  const { data } = useActivityGroup(id);
  const isParticipant = data.groupMembers.some(
    (member) => member.memberId === myProfile.id,
  );

  const handleOpenModal = () => {
    openModal({
      title: '참여자 목록',
      content: (
        <Table head={TABLE_HEAD.ACTIVITY_GROUP_PARTICIPANTS} className="w-full">
          {data.groupMembers.map(({ memberId, memberName }, index) => (
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
      <Header title={['활동', data.name]}>
        <Button size="sm" onClick={handleOpenModal}>
          참여자 목록
        </Button>
        {data.isOwner && (
          <Button size="sm" color="red">
            관리
          </Button>
        )}
      </Header>
      <Image
        width="w-full"
        height="h-[300px]"
        src={data.imageUrl}
        alt={data.name}
        className="object-cover border rounded-lg"
      />
      <Section>
        <h1 className="text-xl font-bold">{data.name}</h1>
        <p className="my-1 text-sm">{data.content}</p>
        <div className="flex items-center text-sm text-gray-500">
          <LiaCertificateSolid className="mr-1" />
          <span>{data.category}</span>
          <span className="px-2">•</span>
          <MdOutlineDateRange className="mr-1" />
          <span>{getDateSemester(data.createdAt)}</span>
        </div>
      </Section>
      <ActivityNoticeSection data={data.notices} />
      <WeeklyActivitySection
        data={data.activities}
        isParticipant={isParticipant}
      />
    </Content>
  );
};

export default GroupDetailPage;
