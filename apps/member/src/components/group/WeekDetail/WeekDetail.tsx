import DropdownButton from '@components/common/DropdownButton/DropdownButton';
import { FaRegFileAlt } from 'react-icons/fa';
import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_FINDER } from '@constants/path';

interface assignmentsData {
  id: number;
  title: string;
  content: string;
  deadline: string;
}
interface WeekDetailProps {
  id: number;
  week: number;
  content: string;
  assignments: assignmentsData[];
}

const WeekDetail = ({ id, week, content, assignments }: WeekDetailProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const groupId = Number(id);

  return (
    <div key={week} className="p-4">
      <div className="flex items-center justify-between cursor-pointer">
        <div>
          <span className="font-semibold mr-2">{week}.</span>
          <span>{content}</span>
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
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio id
            fuga natus eum laudantium aut, nesciunt dicta! Beatae soluta rerum
            possimus ut tempora est inventore id esse nulla. Mollitia, autem?
          </p>

          {assignments.map(
            ({ id, title }) =>
              id && (
                <div
                  key={id}
                  className="flex cursor-pointer items-center"
                  onClick={() =>
                    navigate(PATH_FINDER.ACTIVITY_ASSIGNMENT(groupId, id), {
                      state: { groupId, week, id },
                    })
                  }
                >
                  <div
                    style={{ width: '25px', height: '25px' }}
                    className="flex items-center justify-center rounded-full bg-red-500 p-1 text-white mr-2"
                  >
                    <FaRegFileAlt size="16" />
                  </div>
                  <p key={id} className="">
                    {title}
                  </p>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default WeekDetail;
