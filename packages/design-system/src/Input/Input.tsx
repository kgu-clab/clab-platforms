import React from 'react';

import { cn } from '@clab-platforms/utils';

interface Props extends React.ComponentProps<'input'> {
  label?: string;
  message?: string;
  labelClassName?: string;
  inputClassName?: string;
  messageClassName?: string;
}

export default function Input({
  id,
  label,
  message,
  className,
  labelClassName,
  inputClassName,
  messageClassName,
  required,
  ...props
}: Props) {
  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <label htmlFor={id} className={cn('mb-1 ml-1 text-xs', labelClassName)}>
          {label}
          {required && <span className="font-bol ml-0.5 text-red-400">*</span>}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'outline-clab-primary rounded-lg border p-2',
          inputClassName,
        )}
        required={required}
        {...props}
      />
      {message && (
        <span className={cn('ml-1 mt-1 text-xs', messageClassName)}>
          {message}
        </span>
      )}
    </div>
  );
}
