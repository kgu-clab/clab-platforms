import React, { ComponentPropsWithRef, forwardRef } from 'react';

import { twMerge } from 'tailwind-merge';

interface InputProps extends ComponentPropsWithRef<'input'> {
  id: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, ...rest }, ref) => {
    return (
      <div className={twMerge('flex flex-col', className)}>
        {label && (
          <label htmlFor={id} className="mb-1 ml-1 text-xs">
            {label}
          </label>
        )}
        <input ref={ref} id={id} className="rounded-lg border p-2" {...rest} />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
