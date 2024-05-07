import React, { ComponentPropsWithRef, forwardRef } from 'react';

import { cn } from '../utils';

interface Props extends ComponentPropsWithRef<'input'> {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, id, className, inputClassName, labelClassName, ...rest }, ref) => {
    return (
      <div className={cn('flex flex-col', className)}>
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
