import { useState } from 'react';

import { AboutColor } from '@clab-platforms/icon';

import Panel from '@components/common/Panel/Panel';

import { MODAL_TITLE } from '@constants/modal';
import useModal from '@hooks/common/useModal';
import { useMyNotifications } from '@hooks/queries';

const AlarmPanel = () => {
  const { data } = useMyNotifications({ size: 5 });

  const [open, setOpen] = useState(true);
  const { openModal } = useModal();

  const handleOpenClick = () => setOpen((prev) => !prev);

  const handleAlarmClick = (content: string) => {
    openModal({
      title: MODAL_TITLE.ALARM,
      content,
    });
  };

  return (
    <Panel>
      <Panel.Header
        icon={<AboutColor />}
        label="알림"
        description={new Date().toLocaleTimeString()}
        isOpen={open}
        onClick={handleOpenClick}
      />
      <Panel.Body isOpen={open} className="flex flex-col text-sm">
        {data.items.length > 0 ? (
          data.items.map(({ id, content }) => (
            <p
              key={id}
              onClick={() => handleAlarmClick(content)}
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
