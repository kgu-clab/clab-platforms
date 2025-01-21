'use client';

import { useEffect, useState } from 'react';

import { PATH } from '@/constants';
import { ApplicationResult } from '@/types';
import { toKoreanApplicationType } from '@/utils';
import { balloons } from 'balloons-js';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

import { useApplyPassed } from '../../hooks';
import { ResultFail, ResultPass } from '../components';

export default function ResultSection() {
  const { recruitmentId } = useParams();
  const searchParams = useSearchParams();
  const studentId = searchParams.get('studentId') || '';

  const { data, isError } = useApplyPassed({
    recruitmentId: Number(recruitmentId),
    studentId,
  });

  const [result, setResult] = useState<ApplicationResult | null>(null);

  useEffect(() => {
    if (!isError && data?.data) {
      setResult(data?.data);
    }
  }, [data, isError]);

  useEffect(() => {
    if (result?.isPass) {
      balloons();
    }
  }, [result]);

  return (
    <>
      <div className="p-nav flex min-h-screen items-center justify-center">
        <div className="max-w-lg p-10">
          <div className="mb-4 text-2xl font-bold">
            <h1>
              {result?.isPass
                ? `${toKoreanApplicationType(result?.applicationType)} 합격을 축하드립니다! 🎉`
                : '지원과 관심에 감사드립니다. 🙏'}
            </h1>
          </div>

          {result?.isPass ? (
            <ResultPass
              name={result?.name}
              applicationType={result?.applicationType}
            />
          ) : (
            <ResultFail />
          )}

          <p className="my-4">감사합니다.</p>

          <Link
            href={result?.isPass ? PATH.HOME : PATH.RESULT}
            className="text-bold text-sm text-gray-500 underline after:content-['_↗'] hover:text-gray-600"
          >
            {result?.isPass ? 'HOME' : '다시 확인하러 가기'}
          </Link>
        </div>
      </div>
    </>
  );
}
