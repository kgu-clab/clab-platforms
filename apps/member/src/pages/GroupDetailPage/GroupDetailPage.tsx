import Button from '@components/common/Button/Button';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import SkeletonImage from '@components/common/Skeleton/SkeletonImage';
import DetailInfo from '@components/group/DetailInfoSection/DetailInfoSection';
import { PATH_FINDER } from '@constants/path';
import { useNavigate, useParams } from 'react-router-dom';
import groupList from '@mocks/data/groupList.json';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import WeeklyActivitySection from '@components/group/WeeklyActivitySection/WeeklyActivitySection';
import GroupNoticeSection from '@components/group/GroupNoticeSection/GroupNoticeSection';

interface AssignmentsData {
  id: number;
  title: string;
  content: string;
  deadline: string;
}
interface NoticesData {
  id: number;
  title: string;
  date: string;
  content: string;
}
interface MembersData {
  id: number;
  memberId: string;
  memberName: string;
  department: string;
  role: string;
}
interface DetailData {
  id: number;
  manager: string;
  name: string;
  image: string;
  description: string;
  category: string;
  weeklyActivities: {
    week: number;
    content: string;
    assignments: AssignmentsData[];
  }[];
  notices: NoticesData[];
  members: MembersData[];
  proposers: MembersData[];
}

const GroupDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const data: DetailData | undefined = groupList.find(
    (group) => group.id === Number(id),
  );

  if (data === undefined) {
    return <ErrorPage />;
  }

  return (
    <Content>
      <Header title={['활동', data.name]}>
        <Button onClick={() => navigate(PATH_FINDER.GROUP_STUDENT(Number(id)))}>
          인원목록
        </Button>
        <Button color="red">관리</Button>
      </Header>

      <SkeletonImage
        src={data.image}
        h={300}
        alt="그룹 이미지"
        className="w-full object-cover rounded-lg border"
      />

      <DetailInfo
        name={data.name}
        category={data.category}
        description={data.description}
      />

      <GroupNoticeSection data={data.notices} />

      <WeeklyActivitySection
        id={Number(id)}
        weeklyActivities={data.weeklyActivities}
      />
    </Content>
  );
};

export default GroupDetailPage;
