import React, { type InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '../utils';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  checkboxClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
