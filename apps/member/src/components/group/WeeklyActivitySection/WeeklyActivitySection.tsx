import { GROUP_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import useToast from '@hooks/common/useToast';
import type { ActivityBoardWithAssignmentType } from '@type/activity';
import type { IDType } from '@type/api';
import { FaRegFileAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

interface WeeklyActivitySectionProps {
  data: Array<ActivityBoardWithAssignmentType>;
  isParticipant: boolean; // 내가 참여자인지 여부
}

const WeeklyActivitySection = ({
  data,
  isParticipant,
}: WeeklyActivitySectionProps) => {
  const { id } = useParams(); // 활동 그룹 ID
  const navigate = useNavigate();
  const toast = useToast();

  if (!id) throw new Error(GROUP_MESSAGE.NO_ACTIVITY);

  const onClick = (assignmentId: IDType, state: Array<string | undefined>) => {
    if (isParticipant) {
      navigate(PATH_FINDER.ACTIVITY_ASSIGNMENT(id, assignmentId), {
        state: { name: state },
      });
    } else {
      toast({
        state: 'error',
        message: '참여자만 열람이 가능해요.',
      });
    }
  };

  return (
    <div className="bg-white border divide-y rounded-lg">
      <div className="p-4 rounded-t-lg bg-sky-100">
        <h1 className="text-lg font-semibold">주차별 활동</h1>
      </div>
      <div className="divide-y">
        {[...data].map(({ title, content, assignments }, index) => (
          <div key={index + 1} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <span>{index + 1}.</span>
                <span>{title}</span>
              </div>
            </div>
            <div className="overflow-hidden transition duration-500 ease-in-out">
              <div className="mt-2 space-y-4">
                <p className="text-sm whitespace-pre-line break-keep">
                  {content}
                </p>
                {assignments?.map(
                  ({ id: assignmentId, title: assignmentTitle }) => (
                    <div
                      key={id}
                      onClick={() =>
                        onClick(assignmentId, [title, assignmentTitle])
                      }
                      className="flex items-center cursor-pointer"
                    >
                      <FaRegFileAlt
                        style={{ width: '25px', height: '25px' }}
                        className="flex items-center justify-center p-1 text-red-500"
                      />
                      <span>{assignmentTitle}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyActivitySection;
