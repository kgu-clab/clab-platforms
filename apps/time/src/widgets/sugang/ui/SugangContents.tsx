import React from 'react';

import { useContentByPage } from '@/widgets/sugang/model';
import { Mode } from '@/widgets/sugang/types';
import { SugangPageButtons, SugangTableView } from '@/widgets/sugang/ui';

export default function SugangContents() {
  const { mode, selected, setSelected } = useContentByPage();
  return (
    <div className="flex h-[calc(100vh-7.5rem)] flex-col gap-y-2 px-4 py-2 text-sm">
      <SugangPageButtons selected={selected} setSelected={setSelected} />
      <div className="grid h-full gap-y-4 pt-2">
        <SugangTableView mode={mode as Mode} />
        <SugangTableView mode="registrationList" />
      </div>
    </div>
  );
}
