import Section from '@components/common/Section/Section';
import { Button, Input } from '@clab/design-system';
import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';
import { useActivityGroupMemberApplierInfo } from '@hooks/queries/useActivityGroupMemberApplierInfo';
import Select from '@components/common/Select/Select';
import { useActivityGroupMemberByStatus } from '@hooks/queries/useActivityGroupMemberByStatus';
import type { ActivityRequestType } from '@type/activity';
import { useActivityGroupMemberApplyMutation } from '@hooks/queries/useActivityGroupMemberApplyMutation';

const ApplyForm = () => {
  const { data: applierData } = useActivityGroupMemberApplierInfo();
  const { data: groupData } = useActivityGroupMemberByStatus(
    'PROGRESSING',
    0,
    20,
  );
  const { activityGroupMemberMutate } = useActivityGroupMemberApplyMutation();
  const [inputs, setInputs] = useState<ActivityRequestType>({
    applierName: applierData.name,
    applierId: applierData.id,
    applierDepartment: applierData.department,
    applierYear: String(applierData.grade),
    activityGroupId: 0,
    applyReason: '',
  });
  const selectOption = groupData.items.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  const { activityGroupId, applyReason } = inputs;
  const onChangeInputs = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickCreate = () => {
    if (activityGroupId === 0 || !applyReason) {
      // 필수 입력 사항이 비어있을 경우
      alert('필수 입력 사항을 모두 입력해주세요.');
    } else {
      activityGroupMemberMutate(inputs);
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
            placeholder={applierData.name}
            onChange={onChangeInputs}
            disabled
          />
          <Input
            label="학번"
            id="managerId"
            name="managerId"
            placeholder={applierData.id}
            onChange={onChangeInputs}
            disabled
          />
        </div>
        <div className="grid grid-cols-2 gap-4 pb-4">
          <Input
            label="학과"
            id="department"
            name="department"
            placeholder={applierData.department}
            onChange={onChangeInputs}
            disabled
          />
          <Input
            label="학년"
            id="grade"
            name="grade"
            placeholder={String(applierData.grade)}
            onChange={onChangeInputs}
            disabled
          />
        </div>
        <div className="form-control">
          <p className="label-text">
            그룹 이름
            <span className="text-sm text-red-500">*</span>
          </p>
          <Select
            name="activityGroupId"
            data={selectOption}
            value={inputs.activityGroupId}
            onChange={onChangeInputs}
            className="w-full"
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
                'text-red-500': inputs.applyReason.length >= 1000,
              })}
            >
              {inputs.applyReason.length}/1000
            </p>
          </label>
          <Input
            id="applyReason"
            name="applyReason"
            placeholder="신청 이유"
            value={inputs.applyReason}
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
