import type { ActivityBoardType } from '@type/activity';
import WeekDetail from '../WeekDetail/WeekDetail';

interface WeeklyActivitySectionProps {
  groupId: string;
  weeklyActivities: Array<ActivityBoardType>;
}
const WeeklyActivitySection = ({
  groupId,
  weeklyActivities,
}: WeeklyActivitySectionProps) => {
  return (
    <div className="rounded-lg border divide-y bg-white">
      <div className="p-4 bg-sky-100 rounded-t-lg">
        <h1 className="text-lg font-semibold">주차별 활동</h1>
      </div>
      <div className="divide-y">
        {weeklyActivities.reverse().map(({ id, title, content }, index) => (
          <WeekDetail
            key={id}
            parentId={id}
            week={index + 1}
            groupId={groupId}
            title={title}
            content={content}
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyActivitySection;
