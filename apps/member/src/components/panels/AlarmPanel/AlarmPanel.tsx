import { FcAbout } from 'react-icons/fc';

import Panel from '@components/common/Panel/Panel';
import SelectButton from '@components/common/SelectButton/SelectButton';
import { useState } from 'react';
import { NotificationItem } from '@type/notification';

interface AlarmPanelProps {
  data: Array<NotificationItem>;
}

const AlarmPanel = ({ data }: AlarmPanelProps) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Panel>
      <Panel.Header
        icon={<FcAbout />}
        label="알림"
        description={`중요한 알림 ${data.length}`}
        isOpen={open}
        onClick={handleClick}
      />
      <Panel.Body isOpen={open} className="flex flex-col text-sm">
        {data.map(
          ({ id, content }) =>
            id <= 5 && (
              <SelectButton className="truncate" key={id} to="">
                {content}
              </SelectButton>
            ),
        )}
      </Panel.Body>
    </Panel>
  );
};

export default AlarmPanel;
