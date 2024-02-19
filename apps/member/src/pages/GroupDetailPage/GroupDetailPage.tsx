import { Button } from '@clab/design-system';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import GroupDetailSection from '@components/group/GroupDetailSection/GroupDetailSection';
import { PATH_FINDER } from '@constants/path';
import { useNavigate, useParams } from 'react-router-dom';
import WeeklyActivitySection from '@components/group/WeeklyActivitySection/WeeklyActivitySection';
import Image from '@components/common/Image/Image';
import { useActivityGroupMemberDetail } from '@hooks/queries/useActivityGroupMemberDetail';
import { useActivityGroupBoardsByCategory } from '@hooks/queries/useActivityGroupBoardsByCategory';
import { GROUP_MESSAGE } from '@constants/message';
import type { GroupCategoryType } from '@type/activity';
import GroupAlert from '@components/group/GroupAlert/GroupAlert';

const GroupDetailPage = () => {
  const navigate = useNavigate();
  const { id, category } = useParams();

  if (!id || !category) {
    throw new Error(GROUP_MESSAGE.NO_ACTIVITY);
  }

  const { data: groupDetailData } = useActivityGroupMemberDetail(
    id,
    category as GroupCategoryType,
  );

  const { data: groupNoticeData } = useActivityGroupBoardsByCategory(
    Number(id),
    'NOTICE',
  );

  const { data: groupWeeklyActivityData } = useActivityGroupBoardsByCategory(
    Number(id),
    'WEEKLY_ACTIVITY',
  );

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
        width="w-full"
        height="h-[300px]"
        src={groupDetailData.imageUrl}
        alt={groupDetailData.name}
        className="object-cover rounded-lg border"
      />
      <GroupDetailSection {...groupDetailData} />
      <GroupAlert data={groupNoticeData.items} />
      <WeeklyActivitySection
        name={groupDetailData.name}
        groupId={id}
        weeklyActivities={groupWeeklyActivityData.items}
      />
    </Content>
  );
};

export default GroupDetailPage;
