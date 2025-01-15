'use client';

import PageLayout from '@/app/PageLayout';
import { PATH } from '@/constants';
import Link from 'next/link';

export default function NotFound() {
  return (
    <PageLayout
      nav
      footer
      className="flex min-h-screen flex-col items-center justify-center space-y-6 overflow-hidden text-center"
    >
      <h1 className="px-4 text-5xl font-bold">ERROR</h1>
      <p className="text-xl">결과를 조회할 수 없어요.</p>
      <Link
        href={PATH.RESULT}
        className="bg-clab-yellow border-clab-yellow hover:text-clab-yellow mx-auto rounded-full border px-10 py-2 text-xl font-bold text-black hover:bg-opacity-0"
      >
        돌아가기
      </Link>
    </PageLayout>
  );
}
