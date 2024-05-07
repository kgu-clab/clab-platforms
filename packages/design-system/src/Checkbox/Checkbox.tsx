import React, { ComponentPropsWithRef, forwardRef } from 'react';

import { cn } from '../utils';

export interface Props extends ComponentPropsWithRef<'input'> {
  id: string;
  label: string;
  checkboxClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ id, label, className, checkboxClassName, ...rest }, ref) => {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={cn('accent-clab-main', checkboxClassName)}
          {...rest}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
