import { ChangeEvent, useState } from 'react';

import { Button, Input } from '@clab/design-system';

import Section from '@components/common/Section/Section';

import { postSchedule } from '@api/schedule';
import dayjs from 'dayjs';

import type { ScheduleRegisterItem } from '@type/schedule';

const AddSchedule = () => {
  const [inputs, setInputs] = useState<ScheduleRegisterItem>({
    title: '',
    detail: '',
    startDateTime: '',
    endDateTime: '',
  });
  const { title, detail, startDateTime, endDateTime } = inputs;

  const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickAdd = () => {
    if (!title || !detail || !startDateTime || !endDateTime) {
      alert('필수 입력 사항을 모두 입력해주세요.');
    } else {
      const requestBody: ScheduleRegisterItem = {
        scheduleType: 'ALL',
        title: title,
        detail: detail,
        startDateTime: dayjs(startDateTime).toISOString(),
        endDateTime: dayjs(endDateTime).toISOString(),
        activityGroupId: 0,
      };
      postSchedule(requestBody);
      alert('추가되었습니다.');
    }
  };

  return (
    <Section className="space-y-4">
      <Input
        label="일정명"
        id="title"
        name="title"
        placeholder="일정명을 입력해주세요."
        value={title}
        onChange={onChangeInputs}
      />
      <Input
        label="설명"
        id="detail"
        name="detail"
        placeholder="설명을 입력해주세요."
        value={detail}
        onChange={onChangeInputs}
      />
      <Input
        label="시작일"
        type="date"
        id="startDateTime"
        name="startDateTime"
        value={startDateTime}
        onChange={onChangeInputs}
      />
      <Input
        label="마감일"
        type="date"
        id="endDateTime"
        name="endDateTime"
        value={endDateTime}
        onChange={onChangeInputs}
      />
      <Button onClick={onClickAdd} size="sm">
        일정추가
      </Button>
    </Section>
  );
};

export default AddSchedule;
