'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { Button, Input } from '@clab-platforms/design-system';

import { useRouter } from 'next/navigation';

interface Props {
  recruitmentId: number;
}

export default function CheckResultForm({ recruitmentId }: Props) {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');

  const handleCheckButtonClick = async () => {
    if (studentId.length === 9 && recruitmentId !== 0) {
      router.push(`/apply/result/${recruitmentId}?studentId=${studentId}`);
    } else if (studentId.length !== 9) {
      toast.error('학번을 입력해주세요.');
    }
  };

  return (
    <div className="flex w-full flex-col space-y-2">
      <Input
        id="studentId"
        name="studentId"
        placeholder="학번을 입력해주세요"
        className="grow"
        onChange={(e) => setStudentId(e.target.value)}
        value={studentId}
        inputClassName="text-black"
      />
      <Button
        className="bg-clab-blue border-clab-blue border text-white hover:bg-none"
        onClick={handleCheckButtonClick}
      >
        {studentId.length === 9
          ? '정상적으로 입력됐어요. 확인할까요? 🍀'
          : '합격 확인하기 🔖'}
      </Button>
    </div>
  );
}
