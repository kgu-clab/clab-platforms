import { calculateDDay, formattedDate } from '@utils/date';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface AlertProps {
  className?: string;
  to: string;
  title: string;
  date: string;
}

const Alert = ({ className, to, title, date }: AlertProps) => {
  const dDay = calculateDDay(date);

  return (
    <div className={classNames('w-full', className)}>
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
        <Link to={to} className="w-full truncate">
          {title}
        </Link>
        <p className="whitespace-nowrap text-sm text-gray-500">
          {formattedDate(date)}
        </p>
      </div>
    </div>
  );
};
export default Alert;
