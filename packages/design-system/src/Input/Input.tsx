import React, { type InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '../utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, inputClassName, labelClassName, ...rest }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col', className)}>
        {label && (
          <label
            htmlFor={id}
            className={cn('mb-1 ml-1 text-xs', labelClassName)}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn('rounded-lg border p-2', inputClassName)}
          {...rest}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
