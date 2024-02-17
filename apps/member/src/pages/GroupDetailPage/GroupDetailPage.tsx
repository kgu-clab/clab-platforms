import { Button } from '@clab/design-system';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import GroupDetailSection from '@components/group/GroupDetailSection/GroupDetailSection';
import { PATH_FINDER } from '@constants/path';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import WeeklyActivitySection from '@components/group/WeeklyActivitySection/WeeklyActivitySection';
import GroupNoticeSection from '@components/group/GroupNoticeSection/GroupNoticeSection';
import Image from '@components/common/Image/Image';
import { useActivityGroupMemberDetail } from '@hooks/queries/useActivityGroupMemberDetail';
import { useActivityGroupBoardsByCategory } from '@hooks/queries/useActivityGroupBoardsByCategory';

const GroupDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const category = location.state.category;

  const { data: groupDetailData } = useActivityGroupMemberDetail(
    Number(id),
    category,
  );

  const { data: groupNoticeData } = useActivityGroupBoardsByCategory(
    Number(id),
    'NOTICE',
    0,
    20,
  );
  const { data: groupWeeklyActivityData } = useActivityGroupBoardsByCategory(
    Number(id),
    'WEEKLY_ACTIVITY',
    0,
    20,
  );
  if (groupDetailData === undefined) {
    return <ErrorPage />;
  }
  return (
    <Content>
      <Header title={['활동', groupDetailData.name]}>
        <Button
          size="sm"
          onClick={() =>
            navigate(PATH_FINDER.ACTIVITY_STUDENT(id), {
              state: { name: groupDetailData.name, id: id },
            })
          }
        >
          인원목록
        </Button>
        <Button size="sm" color="red">
          관리
        </Button>
      </Header>
      <Image
        src={groupDetailData.imageUrl}
        alt={groupDetailData.name}
        width="w-full"
        height="h-[300px]"
        className="object-cover rounded-lg border"
      />
      <GroupDetailSection
        name={groupDetailData.name}
        category={groupDetailData.category}
        description={groupDetailData.content}
        createdAt={groupDetailData.createdAt}
      />
      <GroupNoticeSection data={groupNoticeData.items} />
      <WeeklyActivitySection
        groupId={id}
        weeklyActivities={groupWeeklyActivityData.items}
      />
    </Content>
  );
};

export default GroupDetailPage;
