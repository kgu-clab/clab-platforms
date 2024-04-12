import React, { forwardRef } from 'react';

import { twMerge } from 'tailwind-merge';

import { CheckboxProps } from './Checkbox.types';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, className, ...rest }, ref) => {
    return (
      <div className={twMerge('flex items-center gap-2', className)}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="accent-clab-main"
          {...rest}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
