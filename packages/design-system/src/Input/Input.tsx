import React, { ComponentPropsWithRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends ComponentPropsWithRef<'input'> {
  id: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={id} className="text-xs mb-1 ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={twMerge('border rounded-lg p-2', className)}
          {...rest}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
