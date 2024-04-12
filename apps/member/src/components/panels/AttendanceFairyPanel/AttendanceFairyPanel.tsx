import { useState } from 'react';

import { Button } from '@clab/design-system';

import Panel from '@components/common/Panel/Panel';

import fairy from '@assets/webp/fairy.webp';

const AttendanceFairyPanel = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Panel>
      <Panel.Header
        icon={<img src={fairy} alt="출석요정" className="size-5" />}
        label="출석요정"
        description="출석요청이 왔어요!"
        isOpen={open}
        onClick={handleClick}
      />
      <Panel.Body isOpen={open}>
        <div className="rounded-md bg-gray-100 p-2 text-sm">
          <p>Core Team</p>
          <p>1차 대면회의</p>
          <p>아고라 소회의실 1 입니다.</p>
        </div>
        <Button color="red" className="mt-2 w-full">
          출석하기
        </Button>
      </Panel.Body>
    </Panel>
  );
};

export default AttendanceFairyPanel;
