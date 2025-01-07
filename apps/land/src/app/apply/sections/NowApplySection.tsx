'use client';

import { useEffect, useState } from 'react';

import { PATH } from '@/constants';
import { isProgressing } from '@/utils';
import Link from 'next/link';

import { useRecruitment } from '../hooks';

export default function NowApplySection() {
  const { data, isError } = useRecruitment();
  const recentRecruitment = data?.data[0];
  const [isRecruit, setIsRecruit] = useState(false);

  useEffect(() => {
    if (!isError && recentRecruitment) {
      const checkRecruit = isProgressing(
        recentRecruitment.startDate,
        recentRecruitment.endDate,
      );

      setIsRecruit(checkRecruit);
    }
  }, [data, isError]);

  return (
    <div className="bg-clab-gray flex h-fit flex-col space-y-6 break-keep bg-opacity-70 py-28 text-center">
      <p className="text-5xl font-bold leading-snug">
        {isRecruit ? 'C-Lab은 현재 모집중!' : '지금은 모집기간이 아니에요 😢'}
      </p>
      <p className="text-clab-dark-yellow text-2xl font-bold">
        {isRecruit ? '망설이지 말고 지금 바로' : '다음 모집 때 만나요!'}
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
