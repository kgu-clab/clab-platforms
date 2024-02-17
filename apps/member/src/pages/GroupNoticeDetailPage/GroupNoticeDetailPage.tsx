import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import NoticeDetailSection from '@components/group/NoticeDetailSection/NoticeDetailSection';
import { useLocation, useParams } from 'react-router-dom';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import { useActivityGroupBoard } from '@hooks/queries/useActivityGroupBoard';
import { useActivityGroupMember } from '@hooks/queries/useActivityGroupMember';

const GroupNoticePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { groupName, boardId } = location.state;

  console.log(groupName, boardId);
  const { data: noticeData } = useActivityGroupBoard(boardId);
  const { data: groupMemberList } = useActivityGroupMember(Number(id));
  console.log(noticeData, groupMemberList);
  const leader = groupMemberList.items.find((item) => item.role === 'LEADER');

  if (noticeData === undefined) {
    return <ErrorPage />;
  }

  return (
    <Content>
      <Header title={['활동', groupName, '공지사항']} />
      <NoticeDetailSection
        leader={leader?.memberName || ''}
        data={noticeData}
      />
    </Content>
  );
};

export default GroupNoticePage;
