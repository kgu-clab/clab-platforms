import React from 'react';
import { twMerge } from 'tailwind-merge';
import { CheckboxProps } from './Checkbox.types';

const Checkbox = ({ label, className, ...rest }: CheckboxProps) => {
  return (
    <div className={twMerge('flex items-center gap-2', className)}>
      <input
        id={label}
        type="checkbox"
        className="accent-clab-main"
        {...rest}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
