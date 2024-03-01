import Section from '@components/common/Section/Section';
import { useState } from 'react';
import DropdownButton from '@components/common/DropdownButton/DropdownButton';
import classNames from 'classnames';
import { calculateDDay, formattedDate } from '@utils/date';
import useModal from '@hooks/common/useModal';
import type { ScheduleItem } from '@type/schedule';

interface MainAlertProps {
  data: Array<ScheduleItem>;
}

interface MainAlertItemProps {
  className?: string;
  title: string;
  startDate: string;
  detail: string;
  onClick: (content: string) => void;
}

const MainAlert = ({ data }: MainAlertProps) => {
  const { openModal } = useModal();
  const [open, setOpen] = useState(false);

  if (data.length === 0) return null;

  const onClick = (content: string) => {
    openModal({
      title: '📆 일정',
      content,
    });
  };

  return (
    <Section>
      <div className="flex w-full items-center gap-2 divide-x">
        <MainAlert.Item {...data[0]} onClick={onClick} />
        {data.length > 1 && (
          <DropdownButton
            className="pl-2"
            isOpen={open}
            onClick={() => setOpen((prev) => !prev)}
          />
        )}
      </div>
      <div
        className={classNames(
          'overflow-hidden transition duration-500 ease-in-out',
          open ? 'opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <hr className="my-4" />
        <div className="flex flex-col gap-4">
          {data.slice(1).map(({ id, ...rest }) => (
            <MainAlert.Item key={id} {...rest} onClick={onClick} />
          ))}
        </div>
      </div>
    </Section>
  );
};

MainAlert.Item = ({
  className,
  title,
  startDate,
  detail,
  onClick,
}: MainAlertItemProps) => {
  const dDay = calculateDDay(startDate);

  return (
    <div
      className={classNames('w-full cursor-pointer', className)}
      onClick={() => onClick(detail)}
    >
      <div className="flex items-center justify-between gap-2">
        <div
          className={classNames(
            'min-w-[4rem] whitespace-nowrap rounded-full border text-center text-sm',
            {
              'bg-red-400 text-white border-red-400': dDay <= 14,
              'bg-sky-400 text-white border-sky-400': dDay <= 30 && dDay > 14,
            },
          )}
        >
          D-{dDay}
        </div>
        <p className="w-full truncate">{title}</p>
        <p className="whitespace-nowrap text-sm text-gray-500">
          {formattedDate(startDate)}
        </p>
      </div>
    </div>
  );
};

export default MainAlert;
