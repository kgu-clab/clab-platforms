import { useState } from 'react';
import { Button } from '@clab/design-system';
import { useActivityGroupBoardMutation } from '@hooks/queries/useActivityGroupBoardMutation';
import type { ActivityBoardType } from '@type/activity';
import { useActivityGroupBoardFeedback } from '@hooks/queries/useActivityGroupBoardFeedback';
import Textarea from '@components/common/Textarea/Textarea';

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
  const { activityGroupBoardMutate } = useActivityGroupBoardMutation();
  const { data: feedbackData } = useActivityGroupBoardFeedback(mySubmit.id);
  const [feedback, setFeedback] = useState(feedbackData?.content);

  const onClickSubmit = () => {
    activityGroupBoardMutate({
      parentId: assignmentId,
      activityGroupId: activityGroupId,
      body: {
        category: 'FEEDBACK',
        content: feedback,
      },
    });
  };

  return (
    <div className="border rounded-lg">
      <div className="p-3 text-white rounded-t-md bg-neutral-600">
        <h1 className="font-bold">피드백</h1>
      </div>

      <div className="p-4 bg-white">
        <form className="flex w-full">
          <Textarea
            className="w-full"
            placeholder="과제에 대한 피드백을 작성해주세요."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button onClick={onClickSubmit} color="blue">
            저장
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentFeedbackSection;
