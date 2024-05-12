import React, { type InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '../utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  message?: string;
  labelClassName?: string;
  inputClassName?: string;
  messageClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      message,
      className,
      labelClassName,
      inputClassName,
      messageClassName,
      ...rest
    },
    ref,
  ) => {
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
          className={cn(
            'outline-clab-primary rounded-lg border p-2',
            inputClassName,
          )}
          {...rest}
        />
        {message && (
          <span className={cn('ml-1 mt-1 text-xs', messageClassName)}>
            {message}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
