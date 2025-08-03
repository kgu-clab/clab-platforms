'use client';

import { Suspense } from 'react';

import Image from 'next/image';

import TimeTable from './TimeTable';
import TimeTableHeader from './TimeTableHeader';

export default function TimeTableContainer() {
  return (
    <Suspense>
      <div className="relative h-[calc(100vh-202px)] w-[598px] shrink-0 overflow-hidden ">
        <Image
          className="absolute inset-0 -z-10 object-center"
          src="/images/time-table/time-table-bg.png"
          alt="time-table-bg"
          fill
        />
        <div className="scrollbar-hide absolute inset-0 z-10 overflow-y-auto p-10">
          <div className="flex size-full flex-col gap-y-8">
            <TimeTableHeader />
            <TimeTable />
            <hr className="h-10 w-full" />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
