import { useEffect, useState } from 'react';

import { ROLE_LEVEL } from '@constants/state';
import SupportAnswerInput from '@pages/SupportListPage/components/SupportAnswerInput';
import { formattedDate, toKoreaISOString } from '@utils/date';

import type { MemberProfileType } from '@type/member';
import type { SupportAnswerItem } from '@type/support';

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
  const [answer, setAnswer] = useState<SupportAnswerItem>();

  const isAdmin = myProfile.roleLevel >= ROLE_LEVEL.ADMIN;

  const handleAnswerEditToggle = () => setIsAnswerEdit((prev) => !prev);
  const handleAnswerChange = (newAnswer: SupportAnswerItem) =>
    setAnswer(newAnswer);

  useEffect(() => {
    if (!isAnswerEdit) return;

    if (answerData) {
      setAnswer({ ...answerData, id: supportId });
      return;
    }
    setAnswer({
      id: supportId,
      content: '',
      responder: myProfile.name,
      createdAt: new Date().toISOString(),
    });
  }, [isAnswerEdit, answerData, supportId, myProfile.name]);

  if (!isAnswerEdit && answer) {
    return (
      <SupportAnswerInput
        onCancel={handleAnswerEditToggle}
        answer={answer}
        setAnswer={handleAnswerChange}
        isAnswered={isAnswered}
      />
    );
  }

  if (answerData) {
    const { content, createdAt, responder } = answerData;
    return (
      <div className="space-y-2">
        <div>{content}</div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>{`${formattedDate(toKoreaISOString(createdAt))} ${responder}`}</div>
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

  return (
    <div className="space-y-2">
      <p>아직 답변이 등록되지 않았어요.</p>
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
