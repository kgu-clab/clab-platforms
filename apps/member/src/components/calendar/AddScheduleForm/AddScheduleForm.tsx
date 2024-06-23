import { useState } from 'react';

import { Button, Grid, Input } from '@clab/design-system';

import Textarea from '@components/common/Textarea/Textarea';

import useToast from '@hooks/common/useToast';
import { useScheduleMutation } from '@hooks/queries';

interface AddScheduleFormProps {
  onSubmit: () => void;
}

const AddScheduleForm = ({ onSubmit }: AddScheduleFormProps) => {
  const toast = useToast();
  const [inputs, setInputs] = useState({
    title: '',
    detail: '',
    startDateTime: '',
    endDateTime: '',
  });

  const { scheduleMutate } = useScheduleMutation();

  const { title, detail, startDateTime, endDateTime } = inputs;

  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitClick = () => {
    if (!title || !detail || !startDateTime || !endDateTime) {
      return toast({
        state: 'error',
        message: '모든 항목을 입력해주세요.',
      });
    }
    scheduleMutate({
      scheduleType: 'ALL',
      title,
      detail,
      startDateTime,
      endDateTime,
      priority: 'HIGH',
    });
    onSubmit();
  };

  return (
    <div className="space-y-2">
      <Input
        label="일정명"
        id="title"
        name="title"
        placeholder="일정명을 입력해주세요."
        value={title}
        onChange={handleInputsChange}
      />
      <Textarea
        label="내용"
        id="detail"
        name="detail"
        placeholder="내용을 입력해주세요."
        maxLength={200}
        value={detail}
        onChange={handleInputsChange}
      />
      <Grid gap="md" col="2">
        <Input
          label="시작일"
          type="datetime-local"
          id="startDateTime"
          name="startDateTime"
          value={startDateTime}
          onChange={handleInputsChange}
        />
        <Input
          label="마감일"
          type="datetime-local"
          id="endDateTime"
          name="endDateTime"
          value={endDateTime}
          onChange={handleInputsChange}
        />
      </Grid>
      <Button className="w-full" onClick={handleSubmitClick}>
        일정 추가하기
      </Button>
    </div>
  );
};

export default AddScheduleForm;
