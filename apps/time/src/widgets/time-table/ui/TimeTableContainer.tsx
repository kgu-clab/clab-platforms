'use client';

import { Suspense } from 'react';

import Image from 'next/image';

import TimeTable from './TimeTable';
import TimeTableHeader from './TimeTableHeader';

export default function TimeTableContainer() {
  return (
    <Suspense>
      <div className="relative h-fit w-full shrink-0 overflow-hidden lg:h-fit lg:w-[598px]">
        <Image
          className="absolute inset-0 -z-10 object-center"
          src="/images/time-table/time-table-bg.png"
          alt="time-table-bg"
          fill
        />
        <div className="flex size-full flex-col gap-y-4 p-10">
          <TimeTableHeader />
          <TimeTable />
        </div>
      </div>
    </Suspense>
  );
}
