'use client';

import { Button } from '@clab-platforms/design-system';

import Image from 'next/image';

interface Props {
  handleModalClose: () => void;
}

export default function ApplySuccess({ handleModalClose }: Props) {
  return (
    <div className="flex flex-col place-items-center space-y-4">
      <Image src="/favicon.ico" alt="C-Lab" width={64} height={64} />
      <h3 className="text-2xl font-bold">지원하기</h3>
      <p className="text-lg text-gray-500">
        지원이 완료됐어요!
        <br />
        서류 검토 후 연락 드릴 예정이에요.
      </p>
      <div className="flex justify-center space-x-2">
        <Button
          size="sm"
          onClick={handleModalClose}
          className="bg-clab-light-blue hover:bg-clab-light-blue px-4 hover:bg-opacity-70"
        >
          확인
        </Button>
      </div>
    </div>
  );
}
