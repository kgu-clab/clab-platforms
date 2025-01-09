import { ComponentPropsWithRef } from 'react';

import { cn } from '@clab-platforms/utils';

interface Props extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  value?: string;
}

export default function Textarea({
  id,
  label,
  className,
  value,
  maxLength,
  disabled,
  ...props
}: Props) {
  const hasValue = value && value.length > 0;

  return (
    <div className="relative flex w-full flex-col">
      {label && (
        <label htmlFor={id} className="mb-1 ml-1 text-xs">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'rounded-lg border p-2 text-black outline-none transition-colors focus:bg-white',
          hasValue ? 'bg-white' : 'bg-gray-100',
          className,
        )}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        {...props}
      />
      {maxLength && (
        <div
          className={cn('absolute bottom-2 right-2 px-2 text-sm text-black', {
            'text-red-500': value && value.length >= maxLength,
          })}
        >
          {value ? value.length : 0}/{maxLength}
        </div>
      )}
    </div>
  );
}
