'use client';

import React from 'react';

import {
  SugangContents,
  SugangHeader,
  SugangSideBar,
} from '@/widgets/sugang/ui';

export default function SugangLayout() {
  return (
    <div className="flex size-full">
      <SugangSideBar />
      <div className="w-full">
        <SugangHeader />
        <SugangContents />
      </div>
    </div>
  );
}
