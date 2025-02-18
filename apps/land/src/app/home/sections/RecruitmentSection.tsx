'use client';

import { useEffect, useState } from 'react';

import { useApplicationNow } from '@/app/applicationForm/hooks';
import { Section } from '@/components';
import { PATH } from '@/constants';
import { APPLICATION_MESSAGE } from '@/constants/recruitment';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function RecruitmentSection() {
  const { data, isError } = useApplicationNow();
  const [message, setMessage] = useState<string>(
    APPLICATION_MESSAGE.CANNOT_APPLY,
  );

  const isFirstHalfRecruitmentDone = () => {
    const now = dayjs();
    const currentMonth = now.month();
    return [3, 4, 5, 6, 7, 8].includes(currentMonth);
  };

  useEffect(() => {
    if (!isError) {
      const recentRecruitment = data?.data.length > 0;
      if (recentRecruitment) {
        setMessage(APPLICATION_MESSAGE.NOW_APPLY);
      } else {
        isFirstHalfRecruitmentDone()
          ? setMessage(
              APPLICATION_MESSAGE.CANNOT_APPLY +
                APPLICATION_MESSAGE.SECOND_HALF,
            )
          : setMessage(
              APPLICATION_MESSAGE.CANNOT_APPLY + APPLICATION_MESSAGE.FIRST_HALF,
            );
      }
    }
  }, [data, isError]);

  return (
    <Section className="relative text-center">
      <div
        className="absolute inset-0 h-screen w-screen bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), ' +
            "url('/clab_picture.webp')",
        }}
      />
      <div className="z-5 relative">
        <p className="mb-4 px-16 text-4xl font-bold leading-normal md:text-6xl md:leading-normal">
          C-Lab과 함께라면
          <span className="text-clab-light-blue"> 두려울 게 없는 여정</span>
        </p>
        <p className="mb-12 whitespace-pre-wrap text-center text-xl font-bold leading-normal md:text-2xl">
          {message}
        </p>
        <Link
          href={PATH.APPLY}
          className="bg-clab-light-blue border-clab-light-blue hover:text-clab-light-blue mx-auto rounded-full border px-10 py-4 text-xl font-bold text-black hover:bg-opacity-0"
        >
          모집글 확인하기
        </Link>
      </div>
    </Section>
  );
}
