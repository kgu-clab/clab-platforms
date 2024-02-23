import { useState } from 'react';
import { FaPenSquare } from 'react-icons/fa';
import { Button } from '@clab/design-system';
import { useActivityGroupBoardMutation } from '@hooks/queries/useActivityGroupBoardMutation';
import type { ActivityBoardType } from '@type/activity';
import { useActivityGroupBoardFeedback } from '@hooks/queries/useActivityGroupBoardFeedback';

interface AssignmentFeedbackSectionProps {
  assignmentId: string;
  activityGroupId: string;
  mySubmit: ActivityBoardType;
}

const AssignmentFeedbackSection = ({
  assignmentId,
  activityGroupId,
  mySubmit,
}: AssignmentFeedbackSectionProps) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const { activityGroupBoardMutate } = useActivityGroupBoardMutation();
  const { data: feedbackData } = useActivityGroupBoardFeedback(
    mySubmit.id || 0,
  );
  const [feedback, setFeedback] = useState(feedbackData?.content);

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setSubmittedFeedback(feedback);
  //   setFormVisible(false);
  // };
  const onClickSubmit = () => {
    const input: ActivityBoardType = {
      category: 'FEEDBACK',
      content: feedback,
    };
    activityGroupBoardMutate({
      parentId: assignmentId,
      activityGroupId: activityGroupId,
      body: input,
    });
  };

  return (
    <div className="rounded-lg border">
      <div className="rounded-t-md bg-neutral-600 p-3 text-white">
        <h1 className="font-bold">피드백</h1>
      </div>

      {isFormVisible ? (
        <div className="bg-white p-4">
          <form>
            <textarea
              className="w-full rounded-md border-2 border-gray-200 p-2"
              placeholder="Your feedback ..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button
              onClick={onClickSubmit}
              color="blue"
              className="mt-2 px-4 py-2"
            >
              저장
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex items-center rounded-b-md bg-white p-2">
          <span className="flex-grow pl-2 text-sm">
            {feedbackData?.content}
          </span>
          <FaPenSquare
            size="25"
            className="cursor-pointer"
            onClick={() => setFormVisible(!isFormVisible)}
          />
        </div>
      )}
    </div>
  );
};

export default AssignmentFeedbackSection;
