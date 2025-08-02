import { useEffect, useState } from 'react';

import { ROLE_LEVEL } from '@constants/state';
import SupportAnswerInput from '@pages/SupportListPage/components/SupportAnswerInput';
import { formattedDate } from '@utils/date';

import { MemberProfileType } from '@type/member';
import { SupportAnswerItem } from '@type/support';

interface SupportAnswerSectionProps {
  supportId: number;
  answerData?: SupportAnswerItem;
  myProfile: MemberProfileType;
  isAnswered: boolean;
}

const SupportAnswerSection = ({
  supportId,
  answerData,
  myProfile,
  isAnswered,
}: SupportAnswerSectionProps) => {
  const [isAnswerEdit, setIsAnswerEdit] = useState(false);
  const [answer, setAnswer] = useState<SupportAnswerItem>({});

  const isAdmin = myProfile.roleLevel >= ROLE_LEVEL.ADMIN;

  const handleAnswerEditToggle = () => setIsAnswerEdit((prev) => !prev);
  const handleAnswerChange = (newAnswer: SupportAnswerItem) =>
    setAnswer(newAnswer);

  useEffect(() => {
    if (isAnswerEdit && answerData) {
      setAnswer({ ...answerData, id: supportId });
    } else if (isAnswerEdit && !answerData) {
      setAnswer({
        id: supportId,
        content: '',
        responder: myProfile.name,
        createdAt: new Date().toISOString(),
      });
    }
  }, [isAnswerEdit, answerData, supportId, myProfile.name]);

  // 답변 편집 모드
  if (isAnswerEdit) {
    return (
      <SupportAnswerInput
        onCancel={handleAnswerEditToggle}
        answer={answer}
        setAnswer={handleAnswerChange}
        isAnswered={isAnswered}
      />
    );
  }

  // 답변이 있는 경우
  if (isAnswered && answerData) {
    return (
      <div className="space-y-2">
        <div>{answerData.content}</div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            {`${formattedDate(answerData.createdAt!)} ${answerData.responder}`}
          </div>
          {isAdmin && (
            <button
              onClick={handleAnswerEditToggle}
              className="cursor-pointer border-none bg-none text-blue-600 underline hover:text-blue-800"
            >
              수정하기
            </button>
          )}
        </div>
      </div>
    );
  }

  // 답변이 없는 경우
  return (
    <div className="space-y-2">
      <div>아직 답변이 되지 않았어요.</div>
      {isAdmin && (
        <div className="flex justify-end">
          <button
            onClick={handleAnswerEditToggle}
            className="cursor-pointer border-none bg-none text-blue-600 underline hover:text-blue-800"
          >
            답변하기
          </button>
        </div>
      )}
    </div>
  );
};

export default SupportAnswerSection;
