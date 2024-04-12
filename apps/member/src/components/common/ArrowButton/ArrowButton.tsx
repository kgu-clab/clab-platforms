import { ComponentPropsWithRef, forwardRef } from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';

import { cn } from '@utils/string';

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
        <MdOutlineNavigateNext
          size={20}
          className={direction === 'prev' ? 'rotate-180' : 'rotate-0'}
        />
      </button>
    );
  },
);
ArrowButton.displayName = 'ArrowButton';

export default ArrowButton;
