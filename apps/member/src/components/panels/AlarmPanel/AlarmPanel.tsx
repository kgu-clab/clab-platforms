import { useState } from 'react';
import { FcAbout } from 'react-icons/fc';
import Panel from '@components/common/Panel/Panel';
import useModal from '@hooks/common/useModal';
import type { NotificationItem } from '@type/notification';

interface AlarmPanelProps {
  data: Array<NotificationItem>;
}

const AlarmPanel = ({ data }: AlarmPanelProps) => {
  const [open, setOpen] = useState(true);
  const { openModal } = useModal();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const onClickItem = (content: string) => {
    openModal({
      title: '알림',
      content,
    });
  };

  return (
    <Panel>
      <Panel.Header
        icon={<FcAbout />}
        label="알림"
        description={`중요한 알림 ${data.length}`}
        isOpen={open}
        onClick={handleOpen}
      />
      <Panel.Body isOpen={open} className="flex flex-col text-sm">
        {data.slice(0, 5).map(({ id, content }) => (
          <p
            key={id}
            onClick={() => onClickItem(content)}
            className="rounded-md leading-relaxed transition hover:translate-x-1.5 hover:font-semibold truncate cursor-pointer"
          >
            {content}
          </p>
        ))}
      </Panel.Body>
    </Panel>
  );
};

export default AlarmPanel;
