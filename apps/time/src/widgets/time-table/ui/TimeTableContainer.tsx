'use client';

import { Suspense } from 'react';

import { TimeTableLayout } from '@/widgets/time-table/ui';

export default function TimeTableContainer() {
  return (
    <Suspense>
      <TimeTableLayout />
    </Suspense>
  );
}
