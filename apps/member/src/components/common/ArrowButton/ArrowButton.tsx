import { ComponentPropsWithRef, forwardRef } from 'react';

import { ChevronRightOutline } from '@clab-platforms/icon';
import { cn } from '@clab-platforms/utils';

interface ArrowButtonProps extends ComponentPropsWithRef<'button'> {
  direction?: 'prev' | 'next';
}

const ArrowButton = forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ direction = 'prev', className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('rounded border px-0.5 text-gray-500', className)}
        {...rest}
      >
        <ChevronRightOutline
          width={20}
          height={20}
          className={direction === 'prev' ? 'rotate-180' : 'rotate-0'}
        />
      </button>
    );
  },
);
ArrowButton.displayName = 'ArrowButton';

export default ArrowButton;
