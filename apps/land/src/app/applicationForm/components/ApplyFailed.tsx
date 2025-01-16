'use client';

import { Button } from '@clab-platforms/design-system';

import Image from 'next/image';

interface Props {
  handleModalClose: () => void;
}

export default function ApplyFailed({ handleModalClose }: Props) {
  return (
    <div className="flex flex-col place-items-center space-y-4">
      <Image src="/favicon.ico" alt="C-Lab" width={64} height={64} />
      <h3 className="text-xl font-bold">지원하기</h3>
      <p className="text-gray-500">
        지원에 실패했어요. <br />
        지원서를 검토하고 다시 시도해주세요.
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
