import { FcAbout } from 'react-icons/fc';

import Panel from '@components/common/Panel/Panel';
import SelectButton from '@components/common/SelectButton/SelectButton';

interface AlarmPanelProps {
  data: {
    id: number;
    content: string;
  }[];
}

const AlarmPanel = ({ data }: AlarmPanelProps) => {
  return (
    <Panel
      label="알림"
      description={`중요한 알림 ${data.length}`}
      icon={<FcAbout />}>
      <div className="flex flex-col text-sm">
        {data.map(({ id, content }) => (
          <SelectButton key={id} to="">
            {content}
          </SelectButton>
        ))}
      </div>
    </Panel>
  );
};

export default AlarmPanel;
