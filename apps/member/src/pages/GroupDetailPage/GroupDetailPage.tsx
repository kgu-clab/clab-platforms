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
import { useActivityGroupMember } from '@hooks/queries';
import Table from '@components/common/Table/Table';
import { setGroupFilter } from '@utils/group';
import { useEffect, useState } from 'react';
import type { ActivityBoardType } from '@type/activity';
import { LiaCertificateSolid } from 'react-icons/lia';
import { getDateSemester } from '@utils/date';
import Section from '@components/common/Section/Section';
import { MdOutlineDateRange } from 'react-icons/md';

const GroupDetailPage = () => {
  const { id } = useParams();
  const { openModal } = useModal();

  if (!id) throw new Error(GROUP_MESSAGE.NO_ACTIVITY);

  const { data: detailData } = useActivityGroup(id);
  const { data: memberData } = useActivityGroupMember(id);

  const [notices, setNotices] = useState<ActivityBoardType[]>([]);
  const [activities, setActivities] = useState<ActivityBoardType[]>([]);

  const handleOpenModal = () => {
    openModal({
      title: '참여자 목록',
      content: (
        <Table head={['번호', '학번', '이름']} className="w-full">
          {memberData.items.map(({ memberId, memberName }, index) => (
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

  useEffect(() => {
    const [notices, activities] = setGroupFilter(
      detailData.activityGroupBoards,
    );
    setNotices(notices);
    setActivities(activities);
  }, [detailData.activityGroupBoards]);

  return (
    <Content>
      <Header title={['활동', detailData.name]}>
        <Button size="sm" onClick={handleOpenModal}>
          참여자 목록
        </Button>
        {detailData.isOwner && (
          <Button size="sm" color="red">
            관리
          </Button>
        )}
      </Header>
      <Image
        width="w-full"
        height="h-[300px]"
        src={detailData.imageUrl}
        alt={detailData.name}
        className="object-cover border rounded-lg"
      />
      <Section>
        <h1 className="text-xl font-bold">{detailData.name}</h1>
        <p className="my-1 text-sm">{detailData.content}</p>
        <div className="flex items-center text-sm text-gray-500">
          <LiaCertificateSolid className="mr-1" />
          <span>{detailData.category}</span>
          <span className="px-2">•</span>
          <MdOutlineDateRange className="mr-1" />
          <span>{getDateSemester(detailData.createdAt)}</span>
        </div>
      </Section>
      <NoticeSection data={notices} />
      <ActivitySection data={activities} />
    </Content>
  );
};

export default GroupDetailPage;
