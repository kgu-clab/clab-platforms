import { ComponentPropsWithRef, forwardRef } from 'react';

import { cn } from '@clab-platforms/utils';

interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  value?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, className, value, maxLength, ...rest }, ref) => {
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
          ref={ref}
          className={cn(
            'rounded-lg border p-2 outline-none transition-colors focus:bg-white ',
            hasValue ? 'bg-white' : 'bg-gray-100',
            className,
          )}
          value={value}
          maxLength={maxLength}
          {...rest}
        />
        {maxLength && (
          <div
            className={cn(
              'boarder absolute bottom-2 right-2 rounded-lg border bg-white px-2 text-xs font-medium',
              {
                'text-red-500': value && value.length >= maxLength,
              },
            )}
          >
            {value ? value.length : 0}/{maxLength}
          </div>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export default Textarea;
