'use client';

import { Suspense } from 'react';

import Image from 'next/image';

import TimeTableLayout from './TimeTableLayout';

export default function TimeTableContainer() {
  return (
    <Suspense>
      <div className="relative h-full w-[598px] shrink-0 overflow-hidden p-10">
        <Image
          className="absolute inset-0 -z-10 object-center"
          src="/images/time-table/time-table-bg.png"
          alt="time-table-bg"
          fill
        />
        <TimeTableLayout />
      </div>
    </Suspense>
  );
}
