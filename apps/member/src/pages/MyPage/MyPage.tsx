import Content from '@components/common/Content/Content';
import HistorySection from '@components/my/HistorySection/HistorySection';
import ProfileSection from '@components/my/ProfileSection/ProfileSection';
import profile from '@mocks/data/profile.json';
import myAlertList from '@mocks/data/myAlertList.json';
import myCommentList from '@mocks/data/myCommentList.json';
import myPostList from '@mocks/data/myPostList.json';

const MyPage = () => {
  return (
    <Content>
      <ProfileSection data={profile} />
      <HistorySection title="지난 알림" data={myAlertList} />
      <HistorySection title="나의 게시글" data={myPostList} />
      <HistorySection title="나의 댓글" data={myCommentList} />
    </Content>
  );
};

export default MyPage;
