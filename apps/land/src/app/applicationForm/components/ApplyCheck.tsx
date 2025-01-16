'use client';

import { Button } from '@clab-platforms/design-system';

import Image from 'next/image';

interface Props {
  handleModalConfirm: () => void;
  handleModalClose: () => void;
}

export default function ApplyCheck({
  handleModalConfirm,
  handleModalClose,
}: Props) {
  return (
    <div className="flex flex-col place-items-center space-y-4">
      <Image src="/favicon.ico" alt="C-Lab" width={64} height={64} />
      <h3 className="text-xl font-bold">지원하기</h3>
      <p className="text-gray-500">작성하신 정보로 지원하시겠습니까?</p>
      <div className="flex justify-center space-x-2">
        <Button
          onClick={handleModalConfirm}
          size="sm"
          className="bg-clab-light-blue hover:bg-clab-light-blue px-4 hover:bg-opacity-70"
        >
          확인
        </Button>
        <Button
          onClick={handleModalClose}
          size="sm"
          className="bg-clab-light-blue hover:bg-clab-light-blue px-4 hover:bg-opacity-70"
        >
          취소
        </Button>
      </div>
    </div>
  );
}
