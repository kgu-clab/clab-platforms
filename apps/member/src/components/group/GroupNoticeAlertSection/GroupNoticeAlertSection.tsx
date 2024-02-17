import { PATH_FINDER } from '@constants/path';
import type { ActivityBoardType } from '@type/activity';
import { formattedDate } from '@utils/date';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';

interface GroupNoticeAlertSectionProps {
  className?: string;
  latest: boolean;
  groupName: string;
  data: ActivityBoardType;
}

const GroupNoticeAlertSection = ({
  className,
  latest,
  data,
  groupName,
}: GroupNoticeAlertSectionProps) => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) return null;

  return (
    <div className={classNames('w-full', className)}>
      <div
        className="flex items-center justify-between gap-2 font-semibold"
        onClick={() =>
          navigate(PATH_FINDER.ACTIVITY_NOTICE(id), {
            state: { groupName: groupName, boardId: data.id },
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

        <p className="w-full truncate">{data.title}</p>
        <p className="whitespace-nowrap text-sm text-gray-500">
          {formattedDate(data.createdAt || '')}
        </p>
      </div>
    </div>
  );
};

export default GroupNoticeAlertSection;
