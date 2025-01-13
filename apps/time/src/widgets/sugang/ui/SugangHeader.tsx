import { memo } from 'react';

import { KguLogo } from '@clab-platforms/icon';
import SvgMenu from '@clab-platforms/icon/src/outline/react/Menu';

function SugangHeader() {
  return (
    <div className="flex w-full items-center border-b-2 p-4">
      <div className="flex items-center gap-x-10">
        <button>
          <SvgMenu fontSize={20} />
        </button>{' '}
        <KguLogo className="h-fit w-24" />
      </div>
    </div>
  );
}

export default memo(SugangHeader);
