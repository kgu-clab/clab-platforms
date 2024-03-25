import Panel from '@components/common/Panel/Panel';
import { ScheduleItem } from '@type/schedule';
import { useCallback, useState } from 'react';
import { FcTimeline } from 'react-icons/fc';

interface ActivityPanelProps {
  data: ScheduleItem[];
}

const ActivityPanel = ({ data }: ActivityPanelProps) => {
  const [open, setOpen] = useState(true);

  const handleOpenClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <Panel>
      <Panel.Header
        icon={<FcTimeline />}
        label="활동"
        description={
          data.length === 0
            ? '참여하고 있는 활동이 없어요.'
            : `${data.length}개의 활동이 있어요.`
        }
        isOpen={open}
        onClick={handleOpenClick}
      />
      {
        <Panel.Body isOpen={open}>
          {data.length ? (
            <div className="space-y-4 text-sm">
              <ul className="p-2 text-gray-500 list-disc list-inside bg-gray-100 rounded-md">
                {data.map(({ id, activityName }) => (
                  <li key={id} className="font-semibold">
                    {activityName}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-xs text-center bg-gray-100 py-1.5 rounded-lg">
              새로운 활동을 참여하는 건 어떨까요?
            </p>
          )}
        </Panel.Body>
      }
    </Panel>
  );
};

export default ActivityPanel;
