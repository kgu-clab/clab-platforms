import { cn } from '@utils/string';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';

interface ArrowButtonProps extends ComponentPropsWithRef<'button'> {
  direction?: 'prev' | 'next';
}

const ArrowButton = forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ direction = 'prev', className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('px-0.5 text-gray-500 border rounded', className)}
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

export default ArrowButton;
