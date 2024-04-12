import { useCallback, useState } from 'react';
import { FcAbout } from 'react-icons/fc';

import Panel from '@components/common/Panel/Panel';

import useModal from '@hooks/common/useModal';

import type { NotificationItem } from '@type/notification';

interface AlarmPanelProps {
  data: NotificationItem[];
  totalLength: number;
}

const AlarmPanel = ({ data, totalLength }: AlarmPanelProps) => {
  const [open, setOpen] = useState(true);
  const { openModal } = useModal();

  const handleOpenClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const onClickAlarm = useCallback(
    (content: string) => {
      openModal({
        title: '알림',
        content,
      });
    },
    [openModal],
  );

  return (
    <Panel>
      <Panel.Header
        icon={<FcAbout />}
        label="알림"
        description={`총 알림 ${totalLength}`}
        isOpen={open}
        onClick={handleOpenClick}
      />
      <Panel.Body isOpen={open} className="flex flex-col text-sm">
        {data.length > 0 ? (
          data.slice(0, 5).map(({ id, content }) => (
            <p
              key={id}
              onClick={() => onClickAlarm(content)}
              className="cursor-pointer truncate rounded-md leading-relaxed transition hover:translate-x-1.5 hover:font-semibold"
            >
              {content}
            </p>
          ))
        ) : (
          <p className="rounded-lg bg-gray-100 py-1.5 text-center text-xs">
            새로운 알림이 없어요.
          </p>
        )}
      </Panel.Body>
    </Panel>
  );
};

export default AlarmPanel;
