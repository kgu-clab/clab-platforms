import { memo } from 'react';

import { KguLogo } from '@clab-platforms/icon';
import SvgMenu from '@clab-platforms/icon/src/outline/react/Menu';

function SugangHeader() {
  return (
    <div className="flex w-full items-center border-b-2 p-4">
      <div className="flex items-center gap-x-10">
        <SvgMenu fontSize={20} /> <KguLogo className="h-fit w-24" />
      </div>
    </div>
  );
}

export default memo(SugangHeader);
