import { useState } from 'react';

import { TimelineColor } from '@clab/icon';

import Panel from '@components/common/Panel/Panel';

import { useMyActivitySchedule } from '@hooks/queries';

const ActivityPanel = () => {
  const { data } = useMyActivitySchedule();

  const [open, setOpen] = useState(true);

  const handleOpenClick = () => {
    setOpen((prev) => !prev);
  };

  const hasActivities = data.totalItems > 0;

  return (
    <Panel>
      <Panel.Header
        icon={<TimelineColor />}
        label="활동"
        description={
          hasActivities
            ? `${data.items.length}개의 활동이 있어요.`
            : '참여하고 있는 활동이 없어요.'
        }
        isOpen={open}
        onClick={handleOpenClick}
      />
      {
        <Panel.Body isOpen={open}>
          {hasActivities ? (
            <div className="space-y-4 text-sm">
              <ul className="list-inside list-disc rounded-md bg-gray-100 p-2 text-gray-500">
                {data.items.map(({ id, activityName }) => (
                  <li key={id} className="font-semibold">
                    {activityName}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="rounded-lg bg-gray-100 py-1.5 text-center text-xs">
              새로운 활동을 참여하는 건 어떨까요?
            </p>
          )}
        </Panel.Body>
      }
    </Panel>
  );
};

export default ActivityPanel;
