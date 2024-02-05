import Content from '@components/common/Content/Content';
import HistorySection from '@components/my/HistorySection/HistorySection';
import ProfileSection from '@components/my/ProfileSection/ProfileSection';
import profile from '@mocks/data/profile.json';
import { useMyNotifications, useMyBoards, useMyComments } from '@hooks/queries';

const MyPage = () => {
  const { data: myBoardsData } = useMyBoards();
  const { data: myNotificationsData } = useMyNotifications();
  const { data: myCommentsData } = useMyComments();

  return (
    <Content>
      <ProfileSection data={profile} />
      <HistorySection title="지난 알림" data={myNotificationsData.items} />
      <HistorySection title="나의 게시글" data={myBoardsData.items} />
      <HistorySection title="나의 댓글" data={myCommentsData.items} />
    </Content>
  );
};

export default MyPage;
