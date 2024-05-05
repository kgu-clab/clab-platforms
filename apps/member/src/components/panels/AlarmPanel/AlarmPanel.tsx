import { useCallback, useEffect, useState } from 'react';
import { FcAbout } from 'react-icons/fc';

import Panel from '@components/common/Panel/Panel';

import { MODAL_TITLE } from '@constants/modal';
import useModal from '@hooks/common/useModal';
import { useMyNotifications } from '@hooks/queries';

const AlarmPanel = () => {
  const { refetch, data } = useMyNotifications(0, 5);

  const [open, setOpen] = useState(true);
  const { openModal } = useModal();

  const handleOpenClick = useCallback(() => setOpen((prev) => !prev), []);

  const handleAlarmClick = useCallback(
    (content: string) => {
      openModal({
        title: MODAL_TITLE.ALARM,
        content,
      });
    },
    [openModal],
  );

  useEffect(() => {
    // 알림 패널이 열릴 때마다 알림을 새로고침합니다.
    refetch();
  }, [open, refetch]);

  return (
    <Panel>
      <Panel.Header
        icon={<FcAbout />}
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
