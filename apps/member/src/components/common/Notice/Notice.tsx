import useModal from '@hooks/common/useModal';
import { calculateDDay, formattedDate } from '@utils/date';
import { cn } from '@utils/string';
import { useCallback } from 'react';

interface NoticeProps {
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
}: NoticeProps) => {
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
          'min-w-[4rem] rounded-full text-center text-sm text-white font-semibold bg-red-400',
          {
            'bg-yellow-400': dDay >= 14,
            'bg-sky-400': dDay >= 30,
          },
        )}
      >
        D-{dDay}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full hover:bg-gray-100 rounded-lg transition-colors',
        className,
      )}
    >
      <button
        className="flex items-center justify-between w-full gap-2 outline-none cursor-pointer"
        onClick={handleNoticeClick}
      >
        <div className="flex items-center gap-2">
          {showDDay && renderDDay}
          <p className="w-full truncate">{title}</p>
        </div>
        <p className="text-sm text-gray-500 whitespace-nowrap">
          {formattedDate(date)}
        </p>
      </button>
    </div>
  );
};

export default Notice;
