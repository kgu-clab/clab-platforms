import { useCallback } from 'react';

import { cn } from '@clab-platforms/utils';

import useModal from '@hooks/common/useModal';
import { calculateDDay, formattedDate } from '@utils/date';

interface Props {
  title: string;
  content: string;
  date: string;
  showDDay?: boolean;
  className?: string;
}

const Notice = ({
  title,
  content,
  date,
  showDDay = false,
  className,
}: Props) => {
  const { openModal } = useModal();

  const handleNoticeClick = useCallback(() => {
    openModal({
      title: '📆 공지',
      content,
    });
  }, [content, openModal]);

  let renderDDay: React.ReactNode | null = null;
  if (showDDay) {
    const dDay = calculateDDay(date);
    renderDDay = (
      <div
        className={cn(
          'min-w-[4rem] rounded-full bg-red-400 text-center text-sm font-semibold text-white',
          {
            'bg-yellow-400': dDay >= 14,
            'bg-sky-400': dDay >= 30,
          },
        )}
      >
        {dDay === 0 ? 'D-Day' : `D-${dDay}`}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full rounded-lg transition-colors hover:bg-gray-100',
        className,
      )}
    >
      <button
        className="flex w-full cursor-pointer items-center justify-between gap-2 outline-none"
        onClick={handleNoticeClick}
      >
        <div className="flex items-center gap-2">
          {showDDay && renderDDay}
          <p className="w-full truncate">{title}</p>
        </div>
        <p className="whitespace-nowrap text-sm text-gray-500">
          {formattedDate(date)}
        </p>
      </button>
    </div>
  );
};

export default Notice;
