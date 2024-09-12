import { useNavigate } from 'react-router-dom';

import { RegularFileAltOutline } from '@clab-platforms/icon';

import File from '@components/common/File/File';
import Image from '@components/common/Image/Image';

import { PATH_FINDER } from '@constants/path';
import useToast from '@hooks/common/useToast';
import { isImageFile } from '@utils/api';
import { formattedDate } from '@utils/date';

import { ActivityBoardType } from '@type/activity';
import type { ResponseFile } from '@type/api';

interface WeeklyActivityCardProps {
  index: number;
  title?: string;
  content: string;
  assignments?: Array<ActivityBoardType>;
  isParticipant: boolean;
  groupId: number;
  files?: Array<ResponseFile>;
}

const WeeklyActivityCard = ({
  index,
  title,
  content,
  assignments,
  isParticipant,
  groupId,
  files,
}: WeeklyActivityCardProps) => {
  const navigate = useNavigate();
  const toast = useToast();

  const onClick = (assignmentId: number, state: Array<string | undefined>) => {
    if (isParticipant) {
      navigate(PATH_FINDER.ACTIVITY_ASSIGNMENT(groupId, assignmentId), {
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
    <div key={index + 1}>
      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-2 font-semibold">
          <span>{index + 1}.</span>
          <span>{title}</span>
        </div>
      </div>
      <div className="overflow-hidden transition duration-500 ease-in-out">
        <div className="mt-2 space-y-3">
          <p className="whitespace-pre-line break-keep text-sm">{content}</p>
          <hr />
          {isParticipant && (
            <div>
              <p className="text-sm text-gray-500">첨부 파일</p>
              {files?.map((file) => (
                <div key={file.fileUrl} className="flex gap-2">
                  {isImageFile(file.fileUrl) ? (
                    <Image
                      src={file.fileUrl}
                      alt={file.originalFileName}
                      height="w-[300px]"
                      className="object-cover"
                    />
                  ) : (
                    <File
                      href={file.fileUrl}
                      name={file.originalFileName}
                      key={file.fileUrl}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          {assignments?.map(
            ({
              id: assignmentId,
              title: assignmentTitle,
              dueDateTime: assignmentDueDateTime,
            }) => (
              <div
                key={assignmentId}
                onClick={() => onClick(assignmentId, [title, assignmentTitle])}
                className="flex cursor-pointer items-center rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-100"
              >
                <RegularFileAltOutline
                  width={25}
                  height={25}
                  className="flex items-center justify-center p-1 text-red-500"
                />
                <span>
                  {assignmentTitle} - {formattedDate(assignmentDueDateTime)}
                  까지
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivityCard;
