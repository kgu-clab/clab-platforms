import { Button } from '@clab/design-system';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { useParams } from 'react-router-dom';
import ActivitySection from '@components/group/ActivitySection/ActivitySection';
import Image from '@components/common/Image/Image';
import { GROUP_MESSAGE } from '@constants/message';
import NoticeSection from '@components/group/NoticeSection/NoticeSection';
import { useActivityGroup } from '@hooks/queries/useActivityGroup';
import useModal from '@hooks/common/useModal';

import Table from '@components/common/Table/Table';
import { LiaCertificateSolid } from 'react-icons/lia';
import { getDateSemester } from '@utils/date';
import Section from '@components/common/Section/Section';
import { MdOutlineDateRange } from 'react-icons/md';
import { TABLE_HEAD } from '@constants/head';

const GroupDetailPage = () => {
  const { id } = useParams();
  const { openModal } = useModal();

  if (!id) throw new Error(GROUP_MESSAGE.NO_ACTIVITY);

  const { data } = useActivityGroup(id);

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

  const {
    name,
    imageUrl,
    content,
    category,
    createdAt,
    notices,
    activities,
    isOwner,
  } = data;

  return (
    <Content>
      <Header title={['활동', name]}>
        <Button size="sm" onClick={handleOpenModal}>
          참여자 목록
        </Button>
        {isOwner && (
          <Button size="sm" color="red">
            관리
          </Button>
        )}
      </Header>
      <Image
        width="w-full"
        height="h-[300px]"
        src={imageUrl}
        alt={name}
        className="object-cover border rounded-lg"
      />
      <Section>
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="my-1 text-sm">{content}</p>
        <div className="flex items-center text-sm text-gray-500">
          <LiaCertificateSolid className="mr-1" />
          <span>{category}</span>
          <span className="px-2">•</span>
          <MdOutlineDateRange className="mr-1" />
          <span>{getDateSemester(createdAt)}</span>
        </div>
      </Section>
      <NoticeSection data={notices} />
      <ActivitySection data={activities} />
    </Content>
  );
};

export default GroupDetailPage;
