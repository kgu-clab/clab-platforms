import WeekDetail from '../WeekDetail/WeekDetail';

interface AssignmentsData {
  id: number;
  title: string;
  content: string;
  deadline: string;
}

interface WeeklyActivitySectionProps {
  id: number;
  weeklyActivities: {
    week: number;
    content: string;
    assignments: AssignmentsData[];
  }[];
}

const WeeklyActivitySection = ({
  id,
  weeklyActivities,
}: WeeklyActivitySectionProps) => {
  return (
    <div className="rounded-lg border divide-y bg-white">
      <div className="p-4 bg-sky-100 rounded-t-lg">
        <h1 className="text-lg font-semibold">주차별 활동</h1>
      </div>
      <div className="divide-y">
        {weeklyActivities.map(({ week, content, assignments }) => (
          <WeekDetail
            key={week}
            id={id}
            week={week}
            content={content}
            assignments={assignments}
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyActivitySection;
