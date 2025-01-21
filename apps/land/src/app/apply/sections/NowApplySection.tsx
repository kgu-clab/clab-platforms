'use client';

import { useEffect, useState } from 'react';

import { useApplicationNow } from '@/app/applicationForm/hooks';
import { APPLY_MESSAGE, PATH } from '@/constants';
import Link from 'next/link';

export default function NowApplySection() {
  const { data, isError } = useApplicationNow();
  const [isRecruit, setIsRecruit] = useState(false);

  useEffect(() => {
    if (!isError) {
      const recentRecruitment = data?.data.length > 0;
      setIsRecruit(recentRecruitment);
    }
  }, [data, isError]);

  return (
    <div className="bg-clab-gray flex h-fit flex-col space-y-6 break-keep bg-opacity-70 py-28 text-center">
      <p className="text-3xl font-bold leading-snug md:text-5xl">
        {isRecruit ? APPLY_MESSAGE.CAN_APPLY : APPLY_MESSAGE.CANNOT_APPLY}
      </p>
      <p className="text-clab-dark-yellow text-xl font-bold md:text-2xl">
        {isRecruit ? APPLY_MESSAGE.NOW : APPLY_MESSAGE.NEXT}
      </p>
      {isRecruit && (
        <Link
          href={PATH.APPLICATION_FORM}
          className="bg-clab-yellow border-clab-yellow hover:text-clab-yellow mx-auto rounded-full border px-10 py-2 text-xl font-bold text-black hover:bg-opacity-0"
        >
          지원서 작성하기
        </Link>
      )}
    </div>
  );
}
