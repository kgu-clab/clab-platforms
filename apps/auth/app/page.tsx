'use client';

import { Button } from '@clab/design-system';

import HelpDesk from '@components/common/HelpDesk/HelpDesk';

import Image from 'next/image';

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Image src="/logo.webp" alt="C-Lab" width={120} height={120} priority />
      <div className="text-center">
        <h1 className="text-4xl font-semibold">C-Lab OAuth</h1>
        <h2 className="text-xl font-normal text-gray-500">
          동아리원을 위한 OAuth2.0 로그인 시스템
        </h2>
      </div>
      <div className="space-x-4">
        <Button>체험하기</Button>
        <Button color="blue">시작하기</Button>
      </div>
      <HelpDesk />
    </main>
  );
}
