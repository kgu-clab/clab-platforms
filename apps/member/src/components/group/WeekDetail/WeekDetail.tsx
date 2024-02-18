import DropdownButton from '@components/common/DropdownButton/DropdownButton';
import { FaRegFileAlt } from 'react-icons/fa';
import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_FINDER } from '@constants/path';
import { useActivityGroupBoardsByParent } from '@hooks/queries/useActivityGroupBoardByParent';

interface WeekDetailProps {
  parentId?: number;
  week: number;
  groupId: string;
  title?: string;
  content?: string;
  groupName: string;
}

const WeekDetail = ({
  parentId = 0,
  week,
  groupId,
  title,
  content,
  groupName,
}: WeekDetailProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: assignmentData } = useActivityGroupBoardsByParent(parentId);
  return (
    <div key={groupId} className="p-4">
      <div className="flex items-center justify-between cursor-pointer">
        <div>
          <span className="font-semibold mr-2">{week}.</span>
          <span>{title}</span>
        </div>
        <DropdownButton
          isOpen={open}
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>

      <div
        className={classNames(
          'overflow-hidden transition duration-500 ease-in-out',
          open ? 'opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <hr className="my-4" />

        <div className="space-y-4">
          <p className="text-sm">{content}</p>

          {assignmentData.items.map(
            ({ id, title, category }, index) =>
              id !== parentId &&
              category === 'ASSIGNMENT' && (
                <div
                  key={index}
                  className="flex cursor-pointer items-center"
                  onClick={() =>
                    navigate(
                      PATH_FINDER.ACTIVITY_ASSIGNMENT(groupId, String(id)),
                      {
                        state: {
                          groupId: groupId,
                          id: id,
                          groupName: groupName,
                        },
                      },
                    )
                  }
                >
                  <div
                    style={{ width: '25px', height: '25px' }}
                    className="flex items-center justify-center rounded-full bg-red-500 p-1 text-white mr-2"
                  >
                    <FaRegFileAlt size="16" />
                  </div>
                  <p key={id}>{title}</p>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default WeekDetail;
