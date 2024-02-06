import Panel from '@components/common/Panel/Panel';
import { ScheduleItem } from '@type/schedule';
import { useState } from 'react';
import { FcTimeline } from 'react-icons/fc';

interface ActivityPanelProps {
  data: Array<ScheduleItem>;
}

const ActivityPanel = ({ data }: ActivityPanelProps) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Panel>
      <Panel.Header
        icon={<FcTimeline />}
        label="활동"
        description="다음 활동 D-4"
        isOpen={open}
        onClick={handleClick}
      />
      <Panel.Body isOpen={open}>
        <div className="space-y-4 text-sm">
          <ul className="list-inside list-disc rounded-md bg-gray-100 p-2 text-gray-500">
            {data.map(({ id, activityName }) => (
              <li key={id} className="font-semibold">
                {activityName}
              </li>
            ))}
          </ul>
        </div>
      </Panel.Body>
    </Panel>
  );
};

export default ActivityPanel;
