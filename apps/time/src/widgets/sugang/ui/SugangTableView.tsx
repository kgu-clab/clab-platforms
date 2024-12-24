import React from 'react';

import { TABLE_HEADERS, TABLE_NAMES } from '@/widgets/sugang/model';
import { Mode } from '@/widgets/sugang/types';

interface SugangTableViewProps {
  mode: Mode;
}

export default function SugangTableView({ mode }: SugangTableViewProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <SugangTableTitle mode={mode} />
      <div className="flex h-full border-t-2 border-black/40 bg-gray-100">
        <SugangTableHeader mode={mode} />
      </div>
    </div>
  );
}

function SugangTableTitle({ mode }: SugangTableViewProps) {
  const titles = TABLE_NAMES[mode];
  return (
    <div className="flex justify-between">
      <p className="bg-lime-200">{titles[0]}</p>
      <p>
        {titles[1]} {titles[2] ?? ''}
      </p>
    </div>
  );
}

function SugangTableHeader({ mode }: SugangTableViewProps) {
  const headers = TABLE_HEADERS[mode];
  return (
    <div className="flex h-fit">
      {headers.map((header) => (
        <div
          key={header}
          className="w-fit border border-black/30 p-1 px-4 font-semibold"
        >
          {header}
        </div>
      ))}
    </div>
  );
}
