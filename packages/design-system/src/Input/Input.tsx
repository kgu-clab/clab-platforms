import React, { type InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '@clab-platforms/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  message?: string;
  labelClassName?: string;
  inputClassName?: string;
  messageClassName?: string;
  required?: boolean;
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
      required,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={cn('flex flex-col', className)}>
        {label && (
          <label
            htmlFor={id}
            className={cn('mb-1 ml-1 text-xs', labelClassName)}
          >
            {label}
            {required && <span className="font-bol ml-1 text-red-400">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'outline-clab-primary rounded-lg border p-2',
            inputClassName,
          )}
          required={required}
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
