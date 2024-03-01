import { GROUP_MESSAGE } from '@constants/message';
import type { ActivityBoardWithAssignmentType } from '@type/activity';
import { useParams } from 'react-router-dom';
import WeeklyActivityCard from '../WeeklyActivityCard/WeeklyActivityCard';

interface WeeklyActivitySectionProps {
  data: Array<ActivityBoardWithAssignmentType>;
  isParticipant: boolean; // 내가 참여자인지 여부
}

const WeeklyActivitySection = ({
  data,
  isParticipant,
}: WeeklyActivitySectionProps) => {
  const { id } = useParams(); // 활동 그룹 ID

  if (!id) throw new Error(GROUP_MESSAGE.NO_ACTIVITY);

  return (
    <div className="bg-white border divide-y rounded-lg">
      <div className="p-4 rounded-t-lg bg-sky-100">
        <h1 className="text-lg font-semibold">주차별 활동</h1>
      </div>
      <div className="p-4 divide-y">
        {[...data].map((activity, index) => (
          <WeeklyActivityCard
            key={index}
            index={index}
            groupId={+id}
            isParticipant={isParticipant}
            {...activity}
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyActivitySection;
