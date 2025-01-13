'use client';

import PageLayout from '@/app/PageLayout';
import { PATH } from '@/constants';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <PageLayout
      nav
      footer
      className="flex min-h-screen flex-col items-center justify-center space-y-6 overflow-hidden text-center"
    >
      <h1 className="px-4 text-5xl font-bold">ERROR!</h1>
      <p className="text-xl">
        불편을 드려 죄송합니다. 오류가 발생했어요. 😭
        <br />
        만약 문제가 지속적으로 발생한다면 문의 해주세요.
      </p>
      <Link
        href={PATH.HOME}
        className="bg-clab-yellow border-clab-yellow hover:text-clab-yellow mx-auto rounded-full border px-10 py-2 text-xl font-bold text-black hover:bg-opacity-0"
      >
        HOME
      </Link>
    </PageLayout>
  );
}
