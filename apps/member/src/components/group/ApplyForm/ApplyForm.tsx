import Section from '@components/common/Section/Section';
import { Button, Input } from '@clab/design-system';
import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';

interface CreateFormProps {
  manager: string;
  managerId: string;
  department: string;
  grade: string;
  groupName: string;
  description: string;
}

const ApplyForm = () => {
  const [inputs, setInputs] = useState<CreateFormProps>({
    manager: '',
    managerId: '',
    department: '',
    grade: '',
    groupName: '',
    description: '',
  });

  const { groupName, manager, managerId, department, grade, description } =
    inputs;
  const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickCreate = () => {
    if (
      !groupName ||
      !manager ||
      !managerId ||
      !description ||
      !department ||
      !grade
    ) {
      // 필수 입력 사항이 비어있을 경우
      alert('필수 입력 사항을 모두 입력해주세요.');
    } else {
      alert('산청되었습니다.');
    }
  };

  return (
    <Section>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="이름"
            id="manager"
            name="manager"
            placeholder="이름"
            value={manager}
            onChange={onChangeInputs}
          />
          <Input
            label="학번"
            id="managerId"
            name="managerId"
            placeholder="학번"
            value={managerId}
            onChange={onChangeInputs}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 pb-4">
          <Input
            label="학과"
            id="department"
            name="department"
            placeholder="학과"
            value={department}
            onChange={onChangeInputs}
          />
          <Input
            label="학년"
            id="grade"
            name="grade"
            placeholder="학년"
            value={grade}
            onChange={onChangeInputs}
          />
        </div>
        <div className="form-control">
          <Input
            label="그룹 이름"
            id="groupName"
            name="groupName"
            placeholder="그룹 이름"
            value={groupName}
            onChange={onChangeInputs}
          />
        </div>
        <div className="form-control">
          <label className="flex justify-between label">
            <p className="label-text">
              신청 이유
              <span className="text-sm text-red-500">*</span>
            </p>
            <p
              className={classNames('text-sm font-medium', {
                'text-red-500': inputs.description.length >= 1000,
              })}
            >
              {inputs.description.length}/1000
            </p>
          </label>
          <Input
            id="description"
            name="description"
            placeholder="신청 이유"
            value={description}
            maxLength={1000}
            className="h-80 w-full resize-none scrollbar-hide"
            onChange={onChangeInputs}
          />
        </div>
        <div className="form-control">
          <Button className="w-full" onClick={onClickCreate}>
            신청하기
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default ApplyForm;