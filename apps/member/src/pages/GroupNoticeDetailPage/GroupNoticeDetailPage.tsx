import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import NoticeDetailSection from '@components/group/NoticeDetailSection/NoticeDetailSection';
import { useLocation, useParams } from 'react-router-dom';
import groupList from '@mocks/data/groupList.json';
import ErrorPage from '@pages/ErrorPage/ErrorPage';

interface NoticeData {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface GroupData {
  id: number;
  name: string;
  manager: string;
  notices: NoticeData[];
}

const GroupNoticePage = () => {
  const location = useLocation();

  const { id } = useParams();
  const { noticeId } = location.state;
  console.log(noticeId);
  const data: GroupData | undefined = groupList.find(
    (group) => group.id === Number(id),
  );

  if (data === undefined) {
    return <ErrorPage />;
  }

  const { name, manager, notices } = data;

  const notice: NoticeData | undefined = notices.find(
    (n) => n.id === Number(noticeId),
  );

  if (notice === undefined) {
    return <ErrorPage />;
  }

  return (
    <Content>
      <Header title={['활동', name, '공지사항']} />
      <NoticeDetailSection manager={manager} data={notice} />
    </Content>
  );
};

export default GroupNoticePage;
