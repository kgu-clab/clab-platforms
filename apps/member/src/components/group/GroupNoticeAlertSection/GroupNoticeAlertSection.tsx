import { PATH_FINDER } from '@constants/path';
import { formattedDate } from '@utils/date';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';

interface GroupNoticeAlertSectionProps {
  className?: string;
  latest: boolean;
  noticeId: number;
  title: string;
  date: string;
}

const GroupNoticeAlertSection = ({
  className,
  latest,
  noticeId,
  title,
  date,
}: GroupNoticeAlertSectionProps) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className={classNames('w-full', className)}>
      <div
        className="flex items-center justify-between gap-2 font-semibold"
        onClick={() =>
          navigate(PATH_FINDER.GROUP_NOTICE(Number(id)), {
            state: { noticeId },
          })
        }
      >
        <div
          className={classNames(
            'min-w-[4rem] whitespace-nowrap rounded-full border text-center text-sm font-semibold',
            {
              'bg-red-400 text-white': latest,
            },
          )}
        >
          공지사항
        </div>

        <p className="w-full truncate">{title}</p>
        <p className="whitespace-nowrap text-sm text-gray-500">
          {formattedDate(date)}
        </p>
      </div>
    </div>
  );
};

export default GroupNoticeAlertSection;
