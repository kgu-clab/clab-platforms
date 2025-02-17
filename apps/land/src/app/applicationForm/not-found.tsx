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
      <p className="text-2xl">
        지금은 모집기간이 아니에요.
        <br />
        추후에 다시 방문해주세요!
      </p>
      <Link
        href={PATH.HOME}
        className="bg-clab-yellow border-clab-yellow hover:text-clab-yellow mx-auto rounded-full border px-8 py-1 text-xl font-bold text-black hover:bg-opacity-0"
      >
        HOME
      </Link>
    </PageLayout>
  );
}
