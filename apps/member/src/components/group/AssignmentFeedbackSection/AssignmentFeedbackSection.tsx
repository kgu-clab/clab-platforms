import { FormEvent, useState } from 'react';
import { FaPenSquare } from 'react-icons/fa';
import { Button } from '@clab/design-system';

const AssignmentFeedbackSection = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedFeedback(feedback);
    setFormVisible(false);
  };

  return (
    <div className="rounded-lg border">
      <div className="rounded-t-md bg-neutral-600 p-3 text-white">
        <h1 className="font-bold">피드백</h1>
      </div>
      <div className="flex items-center rounded-b-md bg-white p-2">
        <span className="flex-grow pl-2 text-sm">{submittedFeedback}</span>
        <FaPenSquare
          size="25"
          className="cursor-pointer"
          onClick={() => setFormVisible(!isFormVisible)}
        />
      </div>
      {isFormVisible && (
        <div className="bg-white p-4">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full rounded-md border-2 border-gray-200 p-2"
              placeholder="Your feedback ..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button color="blue" className="mt-2 px-4 py-2">
              저장
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AssignmentFeedbackSection;
