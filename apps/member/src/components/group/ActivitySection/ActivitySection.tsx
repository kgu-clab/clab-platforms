import { GROUP_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import type { ActivityBoardWithAssignmentType } from '@type/activity';
import classNames from 'classnames';
import { FaRegFileAlt } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

interface ActivitySectionProps {
  data: Array<ActivityBoardWithAssignmentType>;
}

interface ActivitySectionItemProps extends ActivityBoardWithAssignmentType {
  groundId: string;
  week: number;
}

const ActivitySection = ({ data }: ActivitySectionProps) => {
  const { id } = useParams(); // 활동 그룹 ID

  if (!id) throw new Error(GROUP_MESSAGE.NO_ACTIVITY);

  return (
    <div className="bg-white border divide-y rounded-lg">
      <div className="p-4 rounded-t-lg bg-sky-100">
        <h1 className="text-lg font-semibold">주차별 활동</h1>
      </div>
      <div className="divide-y">
        {[...data].map(({ ...props }, index) => (
          <ActivitySection.Item
            key={index + 1}
            groundId={id}
            week={index + 1}
            {...props}
          />
        ))}
      </div>
    </div>
  );
};

ActivitySection.Item = ({
  groundId,
  title,
  content,
  assignments,
  week,
}: ActivitySectionItemProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span>{week}.</span>
          <span>{title}</span>
        </div>
      </div>
      <div
        className={classNames(
          'overflow-hidden transition duration-500 ease-in-out',
        )}
      >
        <div className="mt-2 space-y-4">
          <p className="text-sm whitespace-pre-line break-keep">{content}</p>
          {assignments?.map(({ id, title: assignmentTitle }) => (
            <Link
              key={id}
              to={PATH_FINDER.ACTIVITY_ASSIGNMENT(groundId, id)}
              state={{ name: [title, assignmentTitle] }}
              className="flex items-center cursor-pointer"
            >
              <FaRegFileAlt
                style={{ width: '25px', height: '25px' }}
                className="flex items-center justify-center p-1 text-red-500"
              />
              <span>{assignmentTitle}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;
