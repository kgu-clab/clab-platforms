import Panel from '@components/common/Panel/Panel';
import { FcTimeline } from 'react-icons/fc';

interface ActivityPanelProps {
  data: {
    id: number;
    title: string;
  }[];
}

const ActivityPanel = ({ data }: ActivityPanelProps) => {
  return (
    <Panel label="활동" description="다음 활동 D-4" icon={<FcTimeline />}>
      <div className="space-y-4 text-sm">
        <ul className="list-inside list-disc rounded-md bg-gray-100 p-2 text-gray-500">
          {data.map(({ id, title }) => (
            <li key={id} className="font-bold">
              {title}
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
};

export default ActivityPanel;
